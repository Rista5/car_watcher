const mongoose = require('mongoose');
const { ReadingSchema } = require('./reading');

const schema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 64,
        },
        platform: {
            type: String,
            required: false
        },
        date: mongoose.Schema.Types.Date,
        hourReadings: [ReadingSchema]
    }
);

module.exports = { 
    DeviceReading: mongoose.model('DeviceReading', schema),
    DeviceReadingSchema: schema
}