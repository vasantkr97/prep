import { WebSocket, WebSocketServer } from "ws"


const wss = new WebSocketServer({ port: 8080 })
console.log("WebSocket server running on ws://localhost:8080")

type UserConnection = {
    id: string,
    ws: WebSocket;
    rooms: Set<string>;
    username: string
}

// interface ExtWebSocket extends WebSocket {
//     userId: string,
//     roomId: string
// }

//users -> { id, ws, rooms: Set<string>, usernam}
let users: Map<string, UserConnection> = new Map()

let rooms: Map<string, Set<string>> = new Map()

let cnt = 0

wss.on("connection", (ws) => {
    cnt++
    const userId = String(cnt)

    users.set(userId, {
        id: userId,
        ws,
        rooms: new Set(),
        username: `user-${userId}`
    })

    ws.on("message", (message) => {
        const  { type, payload } = JSON.parse(message.toString())

        if (type === "authentication") {
            const user = users.get(userId)

            if (user) {
                user.username = payload.username
            }
        }

        if (type === "join") {
            joinRoom(payload.roomId, userId)
        }

        if (type === "leave") {
            leaveRoom(payload.roomId, userId);
        }

        if (type === "message") {
            const user = users.get(userId)
            if (!user || !user.rooms.has(payload.roomId)) return
            broadCastMessage(payload.roomId, userId, payload.message)
        }
    })


    ws.on("close", () => {
        const user = users.get(userId)

        user?.rooms.forEach( roomId => leaveRoom(roomId, userId))

        users.delete(userId)
    })

})


function joinRoom(roomId: string, userId: string) {
    const user = users.get(userId)
    if (!user) return 

    user.rooms.add(roomId)

    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set())
    }

    rooms.get(roomId)?.add(userId)
}

function leaveRoom(roomId: string, userId: string) {
    const user = users.get(userId)

    if (!user) {
        return
    }
    const room = rooms.get(roomId)
    if (room) {
        room.delete(userId)
        
        if (room.size === 0) {
            rooms.delete(roomId)
        }
    }
}


function broadCastMessage(roomId: string, message: string, senderId: string) {
    const room = rooms.get(roomId) 
    if (!room) {
        return
    }

    room.forEach(userId => {
        if (userId === senderId) return 
        const user = users.get(userId)
        const ws = user?.ws

        if (ws?.readyState === 1) {
            ws.send(JSON.stringify({
                type: "message",
                payload: {
                    roomId,
                    senderId,
                    message
                }
            }))
        }
    })

}

























