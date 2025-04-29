import uuid
from datetime import datetime, timedelta
from typing import Annotated

import sentry_sdk
from fastapi import APIRouter, Header, HTTPException
from fastapi.params import Depends
from starlette import status

from database.account import Account
from lib.dnevnik_api import DnevnikClient
from routes.responses import SuccessResponse

journal_router = APIRouter(prefix='/journal')


@journal_router.get('/token')
async def get_token(email: str, password: str):
    account = await Account.find_one(Account.email == email, Account.password == password)

    if not account:
        client = DnevnikClient()
        try:
            token = await client.auth(email, password)
        except Exception as e:
            sentry_sdk.capture_exception(e)
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'Не удалось войти в аккаунт')
        account = Account(uid=str(uuid.uuid4()), token=token, email=email, password=password)
        await account.insert()

    return SuccessResponse({'token': account.uid})


async def get_account_from_uid(uid: Annotated[str, Header(alias='X-Api-Token', regex=r'^[\w-]+$')]):
    account = await Account.find_one({'uid': uid})
    if not account:
        raise HTTPException(status.HTTP_404_NOT_FOUND, 'Аккаунт не найден')

    if datetime.now() - account.token_update >= timedelta(days=1):
        client = DnevnikClient()
        token = await client.auth(account.email, account.password)
        account.token = token
        account.token_update = datetime.now()
        await account.save()

    return DnevnikClient(account)


AccessClient = Annotated[DnevnikClient, Depends(get_account_from_uid)]


@journal_router.get('/children')
async def get_children(client: AccessClient):
    children = await client.get_children()

    data = []

    for child in children:
        education = child['educations'][0]

        periods_data = await client.get_periods(education['group_id'])

        periods = []

        for item in periods_data['items']:
            if item['education_period']['id'] == 23:  # Skip
                continue

            periods.append({
                'id': item['identity']['id'],
                'name': item['name'],
                'from': item['date_from'],
                'to': item['date_to'],
            })

        data.append({
            'education_name': education['institution_name'],
            'education_id': education['education_id'],
            'group_name': education['group_name'],
            'group_id': education['group_id'],
            'id': child['identity']['id'],
            'first_name': child['firstname'],
            'surname': child['surname'],
            'middle_name': child['middlename'],
            'uid': child['hash_uid'],
            'periods': periods
        })

    return SuccessResponse(data, headers={
        'Cache-Control': 'max-age=604800',
    })


@journal_router.get('/children/{education_id}/subjects')
async def get_subjects(client: AccessClient, education_id: int, date_from: str, date_to: str):
    data = await client.get_marks(education_id, date_from, date_to)

    subjects = {}

    for item in data:
        subject_id = item['subject_id']
        subject = subjects[subject_id] if subject_id in subjects else None
        if subject is None:
            subject = {
                'name': item['subject_name'],
                'marks': []
            }
            subjects[subject_id] = subject

        value = item['estimate_value_name']
        if item['estimate_type_code'] == '30000':
            value = 'Н'
        elif item['estimate_value_name'] == 'Замечание':
            value = '!'

        subject['marks'].append({
            'id': item['id'],
            'date': item['date'],
            'value': value,
            'why': item['estimate_type_name'],
            'comment': item['estimate_comment']
        })

        subject['marks'].sort(key=lambda mark: datetime.strptime(mark["date"], "%d.%m.%Y"))

    return SuccessResponse(sorted([{**subjects[k], 'id': k} for k in subjects.keys()], key=lambda x: x['name']),
                           headers={
                               'Cache-Control': 'max-age=86400',
                           })


@journal_router.get('/children/{education_id}/acs')
async def get_acs(client: AccessClient, education_id: int):
    data = await client.get_acs(education_id)

    items = []
    for item in data:
        items.append({
            'id': item['identity']['id'],
            'dir': 'i' if item['direction'] == 'input' else 'o',
            'date': item['datetime']
        })

    return SuccessResponse(items, headers={
        'Cache-Control': 'max-age=86400',
    })


@journal_router.get('/{children}/{education_id}/teachers')
async def get_teachers(client: AccessClient, education_id: int):
    data = await client.get_teachers(education_id)

    teachers = []

    for item in data:
        teachers.append({
            'id': item['identity']['id'],
            'name': f'{item["surname"]} {item["firstname"]} {item["middlename"]}',
            'position': item['position_name'],
            'subjects': item['subjects'],
        })

    return SuccessResponse(teachers, headers={
        'Cache-Control': 'max-age=604800',
    })


@journal_router.get('/children/{hash_uid}/finance')
async def get_finance(client: AccessClient, hash_uid: str):
    try:
        data = await client.get_accounts(hash_uid)
    except Exception:
        return SuccessResponse([], headers={
            'Cache-Control': 'max-age=1800',
        })

    items = []

    for account in data:
        items.append({
            'id': account['id'],
            'name': account['accounttypename'],
            'balance': float(account['sum']),
            'customer': account['customer_name'],
        })

    return SuccessResponse(items, headers={
        'Cache-Control': 'max-age=86400',
    })
