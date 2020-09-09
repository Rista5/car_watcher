const { Device } = require('../../models');
const iotConsumer = require('./../iot-consumer');

const msgType = 'SaveDevice';

async function saveDevice(data) {
    try {
        const device = await Device.create(data);

        if (device && device.isCollecting) {
            await iotConsumer.addIotBinding(device.deviceId);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    callback: saveDevice,
    msgType: msgType
}