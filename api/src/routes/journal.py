import uuid
from typing import Annotated

from fastapi import APIRouter, Query

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


@journal_router.get('/children')
async def get_acs(uid: Annotated[str, Query(alias='token', regex=r'^[\w-]+$')]):
    account = await Account.find_one(Account.uid == uid)
    if not account:
        return ErrorResponse('Аккаунт не найден', 404)

    client = DnevnikClient(account.token)

    children = await client.get_children()

    data = []

    for child in children:
        education = child['educations'][0]
        data.append({
            'education_name': education['institution_name'],
            'education_id': education['education_id'],
            'group_name': education['group_name'],
            'group_id': education['group_id'],
            'id': child['identity']['id'],
            'first_name': child['firstname'],
            'surname': child['surname'],
            'middle_name': child['middlename'],
            'uid': child['hash_uid']
        })

    return SuccessResponse(data)
