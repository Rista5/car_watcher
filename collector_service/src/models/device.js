const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        deviceId: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        isCollecting: {
            type: mongoose.Schema.Types.Boolean,
            required: true
        }
    }
)

module.exports = {
    Device: mongoose.model('Device', schema),
    DeviceSchema: schema
}