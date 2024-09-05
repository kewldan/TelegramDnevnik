from fastapi import FastAPI

from routes import journal_router

app = FastAPI(
    debug=True,
    openapi_url=None,
    docs_url=None,
    redoc_url=None
)

app.include_router(journal_router)
