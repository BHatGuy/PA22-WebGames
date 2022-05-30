#!/usr/bin/env python

import asyncio
from websockets import serve

clients = []

async def echo(websocket):
    clients.append(websocket)
    print("connected clients: ", len(clients))
    async for message in websocket:
        for c in clients:
            if c == websocket:
                continue
            await c.send(message)
    clients.remove(websocket)
    

async def main():
    async with serve(echo, "localhost", 3344):
        await asyncio.Future()  # run forever

asyncio.run(main())