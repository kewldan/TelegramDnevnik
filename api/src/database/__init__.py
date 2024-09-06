from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from config import config
from .account import Account

client = AsyncIOMotorClient(config.database_url)
database = client[config.database_name]


async def connect():
    await init_beanie(database, document_models=[Account])
