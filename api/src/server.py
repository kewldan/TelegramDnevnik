from typing import Callable

from fastapi import FastAPI, HTTPException
from starlette import status
from starlette.requests import Request
from starlette.responses import Response

from routes import journal_router
from routes.responses import ErrorResponse

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
    except HTTPException as e:
        return ErrorResponse(e.detail, status_code=e.status_code)
    except Exception as e:
        return ErrorResponse(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
