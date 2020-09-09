const { DeviceReading } = require('./device-reading');
const { Device } = require('./device');
const { Reading } = require('./reading');

const models = {
    DeviceReading: DeviceReading,
    Device: Device,
    Reading: Reading
}

module.exports = models;