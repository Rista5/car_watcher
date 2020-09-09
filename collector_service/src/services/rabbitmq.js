const amqp = require('amqplib');

const connectionString = 'amqp://localhost';

async function setupRabbitMQConnection(connStr) {
    try {
        const conn = await amqp.connect(connStr);
        const channel = await conn.createChannel();

        process.on('exit', (code) => {
            channel.close();
        });

        console.log('Connected to RabbitMQ');
        return channel;

    } catch (error) {
        console.error(error);
    }
}

async function createQueueAndBindToExchange(channel, 
    queueName, exchange, queueBindings, consumeMessage) {

    try {
        channel.assertQueue(queueName, { durable: true });
        queueBindings.forEach(bindStr => {
            channel.bindQueue(queueName, exchange, bindStr);
        });
        
        await channel.consume(queueName, consumeMessage);
    } catch (error) {
        console.error(error);
    }
}

const connection = setupRabbitMQConnection(connectionString);

module.exports = {
    Connection: connection,
    createQueueAndBindToExchange: createQueueAndBindToExchange
}