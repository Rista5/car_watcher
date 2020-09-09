const { Device } = require('../../models');
const iotConsumer = require('./../iot-consumer');

const msgType = 'UpdateDeviceStatus';

async function updateDeviceStatus(data) {
    try {
        const { deviceId, isCollecting } = data;

        console.log(`DATA: ${data}`)
        const device = await Device.findOneAndUpdate({
            deviceId: deviceId
        });

        if (!device) {
            console.log(`Device with id ${deviceId} not found`);
            return true;
        }

        if (device.isCollecting === isCollecting) {
            return true;
        }
        
        device.isCollecting = isCollecting;
        await device.save();

        if (isCollecting) {
            await iotConsumer.addIotBinding(deviceId);
        } else {
            await iotConsumer.removeIotBinding(deviceId);
        }
        
        return true;
    } catch (error) {
        console.error(error);
        return true;
    }
}

module.exports = {
    callback: updateDeviceStatus,
    msgType: msgType
}