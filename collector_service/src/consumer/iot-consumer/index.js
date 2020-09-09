const {Connection: connection, createQueueAndBindToExchange} = require('../../services/rabbitmq');
const { Device } = require('../../models');
const writeReadingToDB = require('./write-reading-to-db');
const parseMessage = require('./../../util/parse-message');

const iotExchange = 'amq.topic';
const iotQueueName = 'IotServerQueue';
const iotQueueBindings = new Set();
const iotReadingCallbacks = [];

const serverName = 'server';
const getBindingString = (deviceId) => deviceId+'.'+serverName;

async function addIotBinding(deviceId) {
    const inSet = iotQueueBindings.has(deviceId);
    if (inSet) {
        console.error(`Binding ${deviceId} already set`);
        return;
    }
    (await connection).bindQueue(iotQueueName, iotExchange, getBindingString(deviceId));
    iotQueueBindings.add(deviceId);
}

async function removeIotBinding(deviceId) {
    const inSet = iotQueueBindings.has(deviceId);
    if (!inSet) {
        console.error(`Binding ${deviceId} not found`);
        return;
    }
    (await connection).unbindQueue(iotQueueName, iotExchange, getBindingString(deviceId));
    iotQueueBindings.delete(deviceId);
}

function addIotCallback(func) {
    if (func[Symbol.toStringTag] !== 'AsyncFunction') {
        throw {
            message: `Passed parameter is not an async function,
             function name: ${func.name}`
        }
    }
    iotReadingCallbacks.push(func);
}

function removeIotCallback(func) {
    const index = iotReadingCallbacks.findIndex(func);
    if (index > -1) {
        iotReadingCallbacks.splice(index, 1);
    }
}

async function consumeMessage(msg) {
    
    const msgObj = parseMessage(msg);
    if(!msgObj) {
        return false;
    }
    
    let dotLoc = msg.fields.routingKey.indexOf(".");
    const clientId = msg.fields.routingKey.substring(0, dotLoc);
    const date = new Date(msg.properties.timestamp * 1000);

    await Promise.all(
        iotReadingCallbacks.map(func => func(clientId, date, msgObj.data))
    );
    
    (await connection).ack(msg);
}

async function loadBindings() {
    const devices = await Device.find({
        deviceId: {$ne: null},
        isCollecting: true
    }).select({
        "deviceId": 1,
        "_id": 0
    });

    devices.forEach(d => {
        iotQueueBindings.add(d.deviceId);
    });
}

async function init() {
    addIotCallback(writeReadingToDB);
    const conn = await connection;

    await loadBindings();
    await createQueueAndBindToExchange( 
        conn, 
        iotQueueName, 
        iotExchange, 
        Array.from(iotQueueBindings),
        consumeMessage);
}

module.exports = {
    init: init,
    addIotBinding: addIotBinding,
    removeIotBinding: removeIotBinding
}