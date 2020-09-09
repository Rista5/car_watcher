const publishDeviceSaved = require('./device-saved');
const publishDeviceStatusUpdated = require('./device-status-updated');
const { Connection, publishMessage } = require('../services/rabbitmq');

module.exports = {
    publishDeviceSaved: publishDeviceSaved,
    publishDeviceStatusUpdated: publishDeviceStatusUpdated,
    Connection: Connection,
    publishMessage: publishMessage
}