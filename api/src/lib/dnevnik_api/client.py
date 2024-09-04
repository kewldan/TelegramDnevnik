import json

import aiohttp


class DnevnikClient:
    def __init__(self, token: str | None = None, endpoint: str = 'https://dnevnik2.petersburgedu.ru/api'):
        self._endpoint = endpoint
        self._token = token

    async def _send_request(self, method: str, uri: str, **kwargs) -> dict[str, ...]:
        url = self._endpoint + uri

        cookies = {}

        if self._token:
            cookies['X-JWT-Token'] = self._token

        if 'cookies' in kwargs:
            cookies.update(kwargs['cookies'])
            del kwargs['cookies']

        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/70.0.3538.77 Chrome/70.0.3538.77 Safari/537.36",
            "accept": "application/json",
            "accept-charset": "UTF-8"
        }

        if 'headers' in kwargs:
            headers.update(kwargs['headers'])
            del kwargs['headers']

        async with aiohttp.ClientSession(cookies=cookies) as session:
            async with session.request(method, url, headers=headers, **kwargs) as resp:
                response = await resp.json()
                print(json.dumps(response, indent=4))
                return response['data']

    async def auth(self, email: str, password: str) -> None:
        data = await self._send_request('POST', '/user/auth/login', json={
            "type": "email",
            "login": email,
            "activation_code": None,
            "password": password,
            "_isEmpty": False
        })
        self._token = data['token']

    async def get_children(self):
        data = await self._send_request('GET', '/journal/person/related-child-list', params={
            'p_page': '1'
        })

        return data['items']

    async def get_periods(self, group_id: int):
        data = await self._send_request('GET', '/group/group/get-list-period', params={
            "p_limit": "500",
            "p_page": "1",
            "p_group_ids[]": str(group_id)
        })

        return data

    async def get_acs(self, education_id: int):
        data = await self._send_request('GET', '/journal/acs/list', params={
            "p_limit": "30",
            "p_page": "1",
            "p_education": str(education_id)
        })

        return data['items']
