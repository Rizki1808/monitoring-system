# Monitoring System with WebSocket and RabbitMQ
Projek UAS WebDev

This project implements a monitoring system using WebSocket for real-time updates and RabbitMQ as a message broker to broadcast random temperature data to connected clients.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- RabbitMQ: [Download and Install RabbitMQ](https://www.rabbitmq.com/download.html)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rizki1808/monitoring-system.git
    cd monitoring-system
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. Open your browser and visit 
[http://localhost:3001](http://localhost:3001), 
[http://localhost:3002](http://localhost:3002), 
[http://localhost:3003](http://localhost:3003) 
to view the monitoring dashboards for each instance.

## Configuration

Make sure RabbitMQ is running locally on the default port (15672 or 5672). If RabbitMQ is running on a different host or port, update the connection details in the `server.js` file.

```javascript
const connection = await amqp.connect('amqp://localhost');
