const amqp = require('amqplib');

const connectionString = require('./../config').rabbitmqHost;
const exchange = 'CarWatcher';
const queueName = 'CarWatcherServer';
const queueBindings = ['*.CarWatcherServer'];


async function setupRabbitMQConnection(connStr, queueName, exchange, queueBindings) {
    try {
        const conn = await amqp.connect(`amqp://${connStr}`);
        const channel = await conn.createChannel();

        await channel.assertExchange(exchange, 'topic', {durable: true});

        await channel.assertQueue(queueName, { durable: true });
        queueBindings.forEach(bindStr => {
            channel.bindQueue(queueName, exchange, bindStr);
        });
        
        await channel.consume(queueName, consumeMessage);

        process.on('exit', (code) =>{
            channel.close();
        });

        console.log('Connected to RabbitMQ');
        return channel;

    } catch (error) {
        console.error(error);
    }
}

async function consumeMessage(msg) {
    
    const msgText = msg.content.toString();
    let msgObj = null;
    try {
        msgObj = JSON.parse(msgText);
    }
    catch (err) {
        console.error(err);
        console.log('DATA: ', msgText);
        return;
    }
    
    let dotLoc = msg.fields.routingKey.indexOf(".");
    const clientId = msg.fields.routingKey.substring(0, dotLoc);

    console.log(`Received message from client ${clientId}`);
    
    (await connection).ack(msg);
}

async function publishMessage(msgType, data) {
    
    if(!msgType || msgType == '') {
        console.log('Message type cant be empty');
        return false;
    }

    const message = {
        type: msgType,
        data: data
    };

    const routingKey = queueName+'.CarWatcherCollector';
    return (await connection).publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
}

const connection = setupRabbitMQConnection(connectionString, 
                                                queueName, 
                                                exchange, 
                                                queueBindings);

module.exports = {
    Connection: connection,
    publishMessage: publishMessage
}