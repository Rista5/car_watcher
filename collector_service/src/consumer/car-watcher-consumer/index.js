const {Connection: connection, createQueueAndBindToExchange} = require('../../services/rabbitmq');
const updateDeviceStatus = require('./update-device-status');
const saveDevice = require('./save-device');
const parseMessage = require('./../../util/parse-message');

const carWatcherExchange = 'CarWatcher';
const carWatcherQueue = 'CarWatcherCollector';
const carWatcherBindings = ['*.CarWatcherCollector'];

const msgTypeCallback = {};

connection.then(conn => {
    conn.assertExchange(carWatcherExchange, 'topic', {durable: true});
});

function addMsgTypeCallback(msgType, func) {
    if (func[Symbol.toStringTag] !== 'AsyncFunction') {
        throw {
            message: `Passed parameter for message type ${msgType}
             is not an async function, function name: ${func.name}`
        };
    }
    if (msgTypeCallback[msgType]) {
        throw {
            message: `Callback for ${msgType} already assigned`
        };
    }
    msgTypeCallback[msgType] = func;
}

function removeMsgTypeCallback(msgType) {
    if (msgTypeCallback[msgType]) {
        return delete msgTypeCallback[msgType];
    }
    return false;
}

async function consumeMessage(msg) {

    const msgObj = parseMessage(msg);
    if (!msgObj) {
        return;
    }
    const { type, data } = msgObj;

    if (msgTypeCallback[type]) {
        const result = await msgTypeCallback[type](data);
        if (result) {
            (await connection).ack(msg);
        }
    }
}

async function init() {
    addMsgTypeCallback(updateDeviceStatus.msgType, updateDeviceStatus.callback);
    addMsgTypeCallback(saveDevice.msgType, saveDevice.callback);

    const conn = await connection;

    await createQueueAndBindToExchange( 
        conn, 
        carWatcherQueue, 
        carWatcherExchange, 
        carWatcherBindings,
        consumeMessage);
}

module.exports = {
    init: init,
    addMsgTypeCallback: addMsgTypeCallback,
    removeMsgTypeCallback: removeMsgTypeCallback
}