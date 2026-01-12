import http from "http"
import WebSocket, { WebSocketServer } from "ws"
import jwt from "jsonwebtoken"

const server = http.createServer()

const wss = new WebSocketServer({ server })

//Single room for set of Client
let room = new Set<WebSocket>()

wss.on("connection", (ws, req) => {
    try {
        //1.auth handshake
        const url = new URL(req.url!, `http://${req.headers.host}`)

        const token = url.searchParams.get("token")


        if (!token) {
            if (ws.readyState === 1) {
                ws.send(JSON.stringify("token not provided"))
            }
            ws.close()
            return
        }

        try {
            const decoded = jwt.verify(token, "vasant");

            if (typeof decoded === "string"){
                ws.close()
                return 
            }
            (ws as any).rooms = new Set()

        } catch {
            ws.close()
        }

        ws.on("message", (data) => {
            const message = data.toString()

            for (const client of room) {
                if (client.readyState === WebSocket.OPEN) {
                    ws.send(message)
                }
            }
        })

        ws.on("close", () => {
            console.log("socket connection closed");
            room.delete(ws)
        })
    } catch {
        ws.close(1008,"Invalid Connection")
    }
})


server.listen(8080, () => {
    console.log("SIngle Room webSocket server")
})