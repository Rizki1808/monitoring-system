const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const amqp = require('amqplib');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3001;

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

let channel; // Mendeklarasikan variabel channel di tingkat global

// RabbitMQ connection setup
async function setupRabbitMQConnection() {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();

    // Declare a queue for sending messages
    const queue = 'temperature_updates';
    await channel.assertQueue(queue, { durable: false });

    // Consume messages from the queue and broadcast to WebSocket clients
    channel.consume(queue, (msg) => {
        const temperature = parseFloat(msg.content.toString());
        broadcastTemperature(temperature);
    }, { noAck: true });
}

// Simulate random temperature updates and send to RabbitMQ
setInterval(() => {
    const randomTemperature = Math.floor(Math.random() * 101);
    sendTemperatureToRabbitMQ(randomTemperature);
}, 1000);

function sendTemperatureToRabbitMQ(temperature) {
    const queue = 'temperature_updates';
    channel.sendToQueue(queue, Buffer.from(temperature.toString()));
}

function broadcastTemperature(temperature) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(temperature.toString());
        }
    });
}

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    // Setup RabbitMQ connection when the server starts
    setupRabbitMQConnection();
});
