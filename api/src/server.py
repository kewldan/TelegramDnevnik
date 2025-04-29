from typing import Callable

import sentry_sdk
from fastapi import FastAPI, HTTPException
from starlette import status
from starlette.requests import Request
from starlette.responses import Response

from lib.dnevnik_api import DnevnikAPIException
from routes import journal_router

app = FastAPI(
    debug=True,
    openapi_url=None,
    docs_url=None,
    redoc_url=None
)

app.include_router(journal_router)


@app.middleware('http')
async def handle_middleware(request: Request, call_next: Callable) -> Response:
    try:
        return await call_next(request)
    except DnevnikAPIException as e:
        sentry_sdk.capture_exception(e)
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, f'ЭД: {e.message}')
    except Exception as e:
        sentry_sdk.capture_exception(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, 'Что-то пошло не так')
