const { publishMessage } = require('../services/rabbitmq');

const msgType = 'SaveDevice';

async function publishDeviceSaved(device) {
    const { deviceId, isCollecting } = device;
    const data = {
        deviceId: deviceId,
        isCollecting: isCollecting
    };

    await publishMessage(msgType, data);
}

module.exports = publishDeviceSaved;