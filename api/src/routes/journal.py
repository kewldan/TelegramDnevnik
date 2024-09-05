from typing import Annotated

from fastapi import APIRouter, Query

from lib.dnevnik_api import DnevnikClient

journal_router = APIRouter(prefix='/journal')


@journal_router.get('/token')
async def get_token(email: str, password: str):
    client = DnevnikClient()

    try:
        await client.auth(email, password)
    except:
        return {'type': 'error', 'message': 'Не удалось войти в аккаунт'}

    return {'type': 'success', 'data': {'token': client._token}}


@journal_router.get('/children')
async def get_acs(token: Annotated[str, Query(min_length=16)]):
    client = DnevnikClient(token)

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

    return {'type': 'success', 'data': data}
