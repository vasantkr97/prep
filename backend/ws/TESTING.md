# WebSocket Multi-Room Testing Guide

## Prerequisites
Make sure the WebSocket server dependencies are installed:
```bash
cd c:\Users\HP\Desktop\prep\backend\ws
bun install
```

## Method 1: Run the Server Directly

1. **Start the server:**
   ```bash
   cd c:\Users\HP\Desktop\prep\backend\ws
   bun run multiRooms.ts
   ```

2. **You should see:**
   ```
   Websocket running on port 3000
   ```

## Method 2: Run Automated Tests

1. **In Terminal 1 - Start the server:**
   ```bash
   cd c:\Users\HP\Desktop\prep\backend\ws
   bun run multiRooms.ts
   ```

2. **In Terminal 2 - Run the test script:**
   ```bash
   cd c:\Users\HP\Desktop\prep\backend\ws
   bun run test-multiRooms.ts
   ```

3. **Expected output:**
   The test script will automatically test:
   - ✅ Token validation
   - ✅ Auto-join room via query string
   - ✅ Manual JOIN room command
   - ✅ MESSAGE broadcasting within rooms
   - ✅ Multiple separate rooms
   - ✅ LEAVE room command
   - ✅ Clients in multiple rooms simultaneously
   - ✅ Room isolation (messages don't leak)
   - ✅ Connection cleanup

## Method 3: Manual Testing with HTML Client

1. **Start the server:**
   ```bash
   cd c:\Users\HP\Desktop\prep\backend\ws
   bun run multiRooms.ts
   ```

2. **Open the test client:**
   - Open `test-client.html` in your browser
   - Open it in **multiple browser tabs** to simulate multiple clients

3. **Test scenarios:**
   
   **Scenario A: Two clients in the same room**
   - Tab 1: Enter token, roomId "room1", click Connect
   - Tab 2: Enter token, roomId "room1", click Connect
   - Tab 1: Send a message
   - ✅ Both tabs should receive the message

   **Scenario B: Multiple rooms**
   - Tab 1: Connect to "room1"
   - Tab 2: Connect to "room2"
   - Tab 1: Send message to room1
   - ✅ Only Tab 1 receives it
   - Tab 2: Send message to room2
   - ✅ Only Tab 2 receives it

   **Scenario C: Join/Leave rooms dynamically**
   - Tab 1: Connect without roomId
   - Tab 1: Use "Join Room" button to join "room1"
   - Tab 2: Connect to "room1"
   - Tab 2: Send message
   - ✅ Tab 1 receives it
   - Tab 1: Use "Leave Room" button to leave "room1"
   - Tab 2: Send another message
   - ✅ Tab 1 does NOT receive it

## Troubleshooting

**Error: Port 3000 already in use**
```bash
# Find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Error: Connection refused**
- Make sure the server is running
- Check that you're connecting to `ws://localhost:3000`
- Verify no firewall is blocking port 3000

**No messages received**
- Check browser console for errors
- Verify both clients are in the same room
- Make sure the connection shows "Connected" status
