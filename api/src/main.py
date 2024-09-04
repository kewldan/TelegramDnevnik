import sys

from lib.dnevnik_api import DnevnikClient


async def main():
    client = DnevnikClient()


if __name__ == '__main__':
    if sys.platform in ['linux', 'darwin']:
        import uvloop

        uvloop.run(main())
    else:
        import asyncio

        asyncio.run(main())
