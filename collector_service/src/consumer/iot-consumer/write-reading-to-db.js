const { DeviceReading, Reading } = require('../../models')
const { getDateFlooredAtHours } = require('../../util/date-util');

async function writeReadingToDB(clientId, date, data) {

    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const nDate = getDateFlooredAtHours(date.getTime());

    const readings = data.sens_data;

    const reading = new Reading({
        min: minutes,
        sec: seconds,
        temp: readings.temperature,
        rpm: readings.batt,
        speed: readings.speed,
        gas: readings.gas,
        batt: readings.battery_charge
    });

    console.log('Readings', readings);
    console.log('saving', reading);

    const sens = await DeviceReading.findOne({
        deviceId: clientId,
        date: nDate
    });
    
    if (!sens) {
        const newSens = new DeviceReading({
            deviceId: clientId,
            platform: data.Platform,
            date: nDate,
            hourReadings: [
                reading
            ]
        });

        await newSens.save();
        console.log('Sensor created');
    } else {
        sens.hourReadings.push(reading);
        await sens.save();
        console.log('Reading pushed');
    }
}

module.exports = writeReadingToDB;