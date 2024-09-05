import sys

import uvicorn


async def main():
    server_config = uvicorn.Config('server:app', host='0.0.0.0', port=80, log_level='info',
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
