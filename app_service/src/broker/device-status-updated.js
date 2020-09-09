const { publishMessage } = require('../services/rabbitmq');

const msgType = 'UpdateDeviceStatus';

async function publishDeviceStatusUpdate(device) {
    const { deviceId, isCollecting } = device;
    const data = {
        deviceId: deviceId,
        isCollecting: isCollecting
    };

    await publishMessage(msgType, data);
}

module.exports = publishDeviceStatusUpdate;