import uuid
from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Header
from fastapi.params import Depends

from database.account import Account
from lib.dnevnik_api import DnevnikClient
from routes.responses import SuccessResponse, ErrorResponse

journal_router = APIRouter(prefix='/journal')


@journal_router.get('/token')
async def get_token(email: str, password: str):
    account = await Account.find_one(Account.email == email, Account.password == password)

    if not account:
        client = DnevnikClient()
        try:
            await client.auth(email, password)
        except:
            return ErrorResponse('Не удалось войти в аккаунт', 401)
        account = Account(uid=str(uuid.uuid4()), token=client._token, email=email, password=password)
        await account.insert()

    return SuccessResponse({'token': account.uid})


async def get_account_from_uid(uid: Annotated[str, Header(alias='X-Api-Token', regex=r'^[\w-]+$')]):
    account = await Account.find_one({'uid': uid})
    if not account:
        return ErrorResponse('Аккаунт не найден', 404)

    return DnevnikClient(account.token)


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
                'name': item['name']
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

    return SuccessResponse(data)


@journal_router.get('/children/{education_id}/subjects')
async def get_subjects(client: AccessClient, education_id: int):
    data = await client.get_marks(education_id, datetime.now() - timedelta(days=1), datetime.now() + timedelta(days=1))

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

        subject['marks'].append({
            'id': item['id'],
            'date': item['date'],
            'value': int(item['estimate_value_name']),
            'why': item['estimate_type_name'],
            'comment': item['estimate_comment']
        })

    return SuccessResponse([{**subjects[k], 'id': k} for k in subjects.keys()])
