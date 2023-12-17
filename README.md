# Monitoring System with WebSocket and RabbitMQ

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

3. **Start RabbitMQ Server:**

    Make sure RabbitMQ is running locally on the default port (5672). If not, you can start the RabbitMQ server based on your operating system:

    - **Linux:**
      ```bash
      sudo service rabbitmq-server start
      ```

    - **Windows:**
      ```powershell
      rabbitmq-server
      ```

    - **macOS:**
      ```bash
      rabbitmq-server
      ```

    After starting RabbitMQ, you can access the RabbitMQ Management UI by visiting [http://localhost:15672](http://localhost:15672). Use the default credentials (guest/guest) to log in.

4. **Start the Monitoring System:**

    Start the server:

    ```bash
    npm start
    ```

<<<<<<< HEAD
5. Open your browser and visit [http://localhost:3001](http://localhost:3001), [http://localhost:3002](http://localhost:3002), and [http://localhost:3003](http://localhost:3003) to view the monitoring dashboards for each instance.

## Configuration

Make sure RabbitMQ is running locally on the default port (5672). If RabbitMQ is running on a different host or port, update the connection details in the `server.js` file.

```javascript
const connection = await amqp.connect('amqp://localhost');
=======
4. Open your browser and visit 
[http://localhost:3001](http://localhost:3001), 
[http://localhost:3002](http://localhost:3002), 
[http://localhost:3003](http://localhost:3003) 
to view the monitoring dashboards for each instance.

## Configuration

Make sure RabbitMQ is running locally on the default port (15672 or 5672). If RabbitMQ is running on a different host or port, update the connection details in the `server.js` file.

```javascript
const connection = await amqp.connect('amqp://localhost');

>>>>>>> 0763c184d9c047f64d18fa8974b6b341341b9bbc
