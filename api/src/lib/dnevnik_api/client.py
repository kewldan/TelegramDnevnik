import logging
from datetime import datetime

import aiohttp

from database import Account
from .utils import serialize_datetime, serialize_date


class DnevnikClient:
    def __init__(self, account: Account | None = None, endpoint: str = 'https://dnevnik2.petersburgedu.ru'):
        self._endpoint = endpoint
        self._account = account

    async def _send_request(self, method: str, uri: str, **kwargs) -> dict[str, ...]:
        url = self._endpoint + uri

        cookies = {}

        if self._account:
            cookies['X-JWT-Token'] = self._account.token

        cookies.update(kwargs.pop('cookies', {}))

        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/70.0.3538.77 Chrome/70.0.3538.77 Safari/537.36",
            "accept": "application/json",
            "accept-charset": "UTF-8"
        }

        headers.update(kwargs.pop('headers', {}))

        async with aiohttp.ClientSession(cookies=cookies) as session:
            async with session.request(method, url, headers=headers, **kwargs) as resp:
                response_cookie = resp.cookies.get('X-JWT-Token')
                if response_cookie and self._account is not None:
                    self._account.token = response_cookie.value
                    self._account.token_update = datetime.now()
                    await self._account.save()
                logging.error(f'text: "{await resp.text()}"')
                logging.error(resp.status)
                response = await resp.json(content_type=None)
                logging.error(f'{uri} {response}')
                if 'data' in response:
                    return response['data']
                else:
                    return response

    async def auth(self, email: str, password: str, **kwargs) -> str:
        data = await self._send_request('POST', '/api/user/auth/login', json={
            "type": "email",
            "login": email,
            "activation_code": None,
            "password": password,
            "_isEmpty": False
        }, **kwargs)
        return data['token']

    async def get_children(self, **kwargs):
        data = await self._send_request('GET', '/api/journal/person/related-child-list', params={
            'p_page': '1'
        }, **kwargs)

        return data['items']

    async def get_periods(self, group_id: int, **kwargs):
        data = await self._send_request('GET', '/api/group/group/get-list-period', params={
            "p_limit": "500",
            "p_page": "1",
            "p_group_ids[]": str(group_id)
        }, **kwargs)

        return data

    async def get_acs(self, education_id: int, **kwargs):
        data = await self._send_request('GET', '/api/journal/acs/list', params={
            "p_limit": "30",
            "p_page": "1",
            "p_education": str(education_id)
        }, **kwargs)

        return data['items']

    async def get_lessons(self, education_id: int, date_from: datetime, date_to: datetime, **kwargs):
        data = await self._send_request('GET', '/api/journal/lesson/list-by-education', params={
            'p_limit': '500',
            'p_page': '1',
            'p_datetime_from': serialize_datetime(date_from),
            'p_datetime_to': serialize_datetime(date_to),
            'p_educations[]': str(education_id)
        }, **kwargs)

        return data['items']

    async def get_schedule(self, education_id: int, date_from: datetime, date_to: datetime, **kwargs):
        data = await self._send_request('GET', '/api/journal/schedule/list-by-education', params={
            'p_limit': '500',
            'p_page': '1',
            'p_datetime_from': serialize_date(date_from),
            'p_datetime_to': serialize_date(date_to),
            'p_educations[]': str(education_id)
        }, **kwargs)

        return data['items']

    async def get_marks(self, education_id: int, date_from: datetime | str, date_to: datetime | str, **kwargs):
        data = await self._send_request('GET', '/api/journal/estimate/table', params={
            'p_limit': '1000',
            'p_date_from': serialize_date(date_from) if isinstance(date_from, datetime) else date_from,
            'p_date_to': serialize_date(date_to) if isinstance(date_to, datetime) else date_to,
            'p_educations[]': str(education_id)
        }, **kwargs)

        return data['items']

    async def get_teachers(self, education_id: int, **kwargs):
        data = await self._send_request('GET',
                                        '/api/journal/teacher/list', params={
                'p_page': '1',
                'p_educations[]': str(education_id),
            }, **kwargs)

        return data['items']

    async def get_subjects(self, group_id: int, period_id: int, **kwargs):
        data = await self._send_request('GET', '/api/journal/subject/list-studied', params={
            "p_limit": "500",
            "p_page": "1",
            "p_groups[]": str(group_id),
            "p_periods[]": str(period_id)
        }, **kwargs)

        return data['items']

    async def get_accounts(self, child_uid: str, **kwargs) -> list[dict[str, str]]:
        data = await self._send_request('POST', '/fps/api/netrika/mobile/v1/accounts/', data={
            'RegId': child_uid
        }, **kwargs)

        return data['accounts']
