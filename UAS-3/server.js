const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3003;

// Set the public directory as the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');

    // Handle messages from the client (if needed)
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    // Handle WebSocket connection close event
    ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
