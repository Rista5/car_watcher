const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        min: {
            type: mongoose.Schema.Types.Number,
            min: 0,
            max: 59
        },
        sec: {
            type: mongoose.Schema.Types.Number,
            min: 0,
            max: 59
        },
        temp: mongoose.Schema.Types.Number,
        rpm: mongoose.Schema.Types.Number,
        speed: mongoose.Schema.Types.Number,
        gas: mongoose.Schema.Types.Number,
        batt: mongoose.Schema.Types.Number
    }
)

module.exports = {
    Reading: mongoose.model('Reading', schema),
    ReadingSchema: schema
};