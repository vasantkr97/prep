import http from "http";
import WebSocket, { WebSocketServer } from "ws"

const server = http.createServer()

interface ExtWebSocket extends WebSocket {
    userId: String;
    rooms: Set<string>;
}

const rooms: Map<string, Set<ExtWebSocket>> = new Map()

const wss = new WebSocketServer({ server })

wss.on("connection", (ws: ExtWebSocket, req) => {
    console.log("Client connection")
    //read roomID from query strin 
    ws.rooms = new Set()

    const url = new URL(req.url!, `http://${req.headers.host}`)
    const roomId = url.searchParams.get("roomId");
    const token = url.searchParams.get("token");

    if (!token) {
        ws.close(1008, "unauthorized")
        return;
    }

    ws.userId = "user_123"

    if (roomId) {
        joinRoom(ws, roomId)
    }

    ws.on("message", (data) => {
        const message = JSON.parse(data.toString())
        console.log(message)

        switch (message.type) {
            case "JOIN":
                joinRoom(ws, message.roomId);
                break;
            case "LEAVE":
                leaveRoom(ws, message.roomId);
                break;
            case "MESSAGE":
                broadCast(message.roomId, { from: ws.userId, text: message.content });
                break
        } 
    })

    ws.on("close", () => {
        ws.rooms.forEach(roomId => {
            leaveRoom(ws, roomId)
        })
    })
} )


function joinRoom(ws: ExtWebSocket, roomId: string) {
    //find a room to add
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set())
    }

    rooms.get(roomId)?.add(ws);
    ws.rooms.add(roomId)
    console.log(rooms)
}

function leaveRoom(ws: ExtWebSocket, roomId: string) {
    if (rooms.has(roomId)) {
        rooms.get(roomId)?.delete(ws)
        ws.rooms.delete(roomId)
    }

    if (rooms.get(roomId)?.size === 0) {
        rooms.delete(roomId)
    }
}

function broadCast(roomId: string, payload: any) {
    const message = JSON.stringify(payload)

    rooms.get(roomId)?.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    })
}


server.listen(3000, () => {
    console.log("✅ WebSocket server running!")
    console.log("📡 Connect at: ws://localhost:3000?token=YOUR_TOKEN&roomId=ROOM_ID")
    console.log("📝 Example: ws://localhost:3000?token=test-token&roomId=room1")
    console.log("\n🌐 Open test-client.html in your browser to test")
})