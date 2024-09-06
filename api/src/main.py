import sys

import uvicorn

from config import config
from database import connect


async def main():
    await connect()
    server_config = uvicorn.Config('server:app', host='0.0.0.0', port=config.port, log_level='info',
                                   server_header=False, date_header=True)
    server = uvicorn.Server(server_config)
    await server.serve()


if __name__ == '__main__':
    if sys.platform in ['linux', 'darwin']:
        import uvloop

        uvloop.run(main())
    else:
        import asyncio

        asyncio.run(main())
