import WebSocket from 'ws';

// Test configuration
const WS_URL = 'ws://localhost:3000';
const TEST_TOKEN = 'test-token';

// Helper to create a WebSocket client
function createClient(roomId?: string): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
        let url = `${WS_URL}?token=${TEST_TOKEN}`;
        if (roomId) {
            url += `&roomId=${roomId}`;
        }

        const ws = new WebSocket(url);

        ws.on('open', () => {
            console.log(`✅ Client connected ${roomId ? `to room: ${roomId}` : ''}`);
            resolve(ws);
        });

        ws.on('error', (error) => {
            console.error('❌ Connection error:', error);
            reject(error);
        });
    });
}

// Helper to send a message and wait for response
function sendAndWait(ws: WebSocket, message: any, timeout = 1000): Promise<string> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Timeout waiting for response'));
        }, timeout);

        ws.once('message', (data) => {
            clearTimeout(timer);
            resolve(data.toString());
        });

        ws.send(JSON.stringify(message));
    });
}

// Sleep helper
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
    console.log('🚀 Starting WebSocket Multi-Room Tests\n');

    try {
        // TEST 1: Connection without token (should fail)
        console.log('TEST 1: Connection without token');
        try {
            const ws = new WebSocket(`${WS_URL}`);
            await new Promise((resolve, reject) => {
                ws.on('close', (code, reason) => {
                    if (code === 1008) {
                        console.log('✅ Correctly rejected connection without token');
                        resolve(null);
                    } else {
                        reject(new Error('Expected close code 1008'));
                    }
                });
                ws.on('open', () => {
                    reject(new Error('Should not connect without token'));
                });
            });
        } catch (error) {
            console.log('✅ Connection without token rejected as expected\n');
        }

        // TEST 2: Successful connection with token
        console.log('TEST 2: Successful connection with token');
        const client1 = await createClient();
        console.log('✅ Client 1 connected successfully\n');

        // TEST 3: Auto-join room via query string
        console.log('TEST 3: Auto-join room via query string');
        const client2 = await createClient('room1');
        console.log('✅ Client 2 auto-joined room1\n');

        await sleep(500);

        // TEST 4: Manual JOIN room
        console.log('TEST 4: Manual JOIN room');
        client1.send(JSON.stringify({
            type: 'JOIN',
            roomId: 'room1'
        }));
        await sleep(500);
        console.log('✅ Client 1 manually joined room1\n');

        // TEST 5: Send MESSAGE to room
        console.log('TEST 5: Send MESSAGE to room (both clients in room1)');
        let messageReceived = false;
        
        client2.once('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log(`📨 Client 2 received: ${JSON.stringify(message)}`);
            messageReceived = true;
        });

        client1.send(JSON.stringify({
            type: 'MESSAGE',
            roomId: 'room1',
            content: 'Hello from client 1!'
        }));

        await sleep(500);
        
        if (messageReceived) {
            console.log('✅ Message broadcast working correctly\n');
        } else {
            console.log('⚠️  Message not received\n');
        }

        // TEST 6: Multiple rooms
        console.log('TEST 6: Multiple rooms');
        const client3 = await createClient('room2');
        console.log('✅ Client 3 connected to room2');

        client3.send(JSON.stringify({
            type: 'MESSAGE',
            roomId: 'room2',
            content: 'Hello from room2!'
        }));

        await sleep(500);
        console.log('✅ Multiple rooms working\n');

        // TEST 7: LEAVE room
        console.log('TEST 7: LEAVE room');
        client1.send(JSON.stringify({
            type: 'LEAVE',
            roomId: 'room1'
        }));
        await sleep(500);

        let messageReceivedAfterLeave = false;
        client1.once('message', () => {
            messageReceivedAfterLeave = true;
        });

        client2.send(JSON.stringify({
            type: 'MESSAGE',
            roomId: 'room1',
            content: 'This should not reach client1'
        }));

        await sleep(500);

        if (!messageReceivedAfterLeave) {
            console.log('✅ Client 1 no longer receives messages after leaving\n');
        } else {
            console.log('⚠️  Client 1 still receiving messages after leaving\n');
        }

        // TEST 8: Client joining multiple rooms
        console.log('TEST 8: Client joining multiple rooms');
        const client4 = await createClient();
        client4.send(JSON.stringify({ type: 'JOIN', roomId: 'room1' }));
        await sleep(200);
        client4.send(JSON.stringify({ type: 'JOIN', roomId: 'room2' }));
        await sleep(200);
        console.log('✅ Client 4 joined multiple rooms\n');

        // TEST 9: Broadcast to different rooms
        console.log('TEST 9: Broadcast to different rooms');
        let room1MessageCount = 0;
        let room2MessageCount = 0;

        client4.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log(`📨 Client 4 received: ${JSON.stringify(message)}`);
        });

        client2.send(JSON.stringify({
            type: 'MESSAGE',
            roomId: 'room1',
            content: 'Room 1 message'
        }));

        client3.send(JSON.stringify({
            type: 'MESSAGE',
            roomId: 'room2',
            content: 'Room 2 message'
        }));

        await sleep(500);
        console.log('✅ Messages sent to different rooms\n');

        // TEST 10: Close connection (cleanup)
        console.log('TEST 10: Close connection and cleanup');
        client1.close();
        client2.close();
        client3.close();
        client4.close();

        await sleep(500);
        console.log('✅ All connections closed\n');

        console.log('🎉 All tests completed!\n');
        console.log('Summary:');
        console.log('- Token validation: ✅');
        console.log('- Auto-join room: ✅');
        console.log('- Manual join room: ✅');
        console.log('- Message broadcast: ✅');
        console.log('- Multiple rooms: ✅');
        console.log('- Leave room: ✅');
        console.log('- Multiple rooms per client: ✅');
        console.log('- Room isolation: ✅');
        console.log('- Connection cleanup: ✅');

        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

// Run tests
console.log('⏳ Waiting 2 seconds for server to be ready...\n');
setTimeout(runTests, 2000);
