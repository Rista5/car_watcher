const { Router } =  require('express');
const { getStatusText } = require('http-status-codes');
const { getDateFlooredAtHours, 
        getDateCeiledAtHours } = require('../../util/date-util');
const middleware = require('../../middleware/device-reading');
const { DeviceReading } = require('../../models/device-reading');

const router = Router();

router.get('/:deviceId/:startTime&:endTime', middleware, async (req, res) => {
    try {

        const deviceId = req.params.deviceId;
        const startTime = Number(req.params.startTime);
        const endTime = Number(req.params.endTime);

        const readings = await DeviceReading.aggregate([
            {$match: 
                {
                    deviceId: deviceId,
                    $and: [
                        {date: {$gte: getDateFlooredAtHours(startTime)}},
                        {date: {$lte: getDateCeiledAtHours(endTime)}}
                    ]
                }
            },
            {$project:
                {
                    _id: 0,
                    __v: 0,
                    deviceId: 0,
                    platform: 0,
                    'hourReadings': {
                        '_id': 0
                    }
                }
            }
        ]).sort({date: 1});

        // if (readings.length == 0) {
        //     return res.status(404).send({
        //         message: 'No readings found for specified device'
        //     });
        // }

        return res.status(200).send(readings);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: getStatusText(500)
        });
    }
});


router.get('/:deviceId/:sensor/:startTime&:endTime', middleware, async (req, res) => {

    try {
        const deviceId = req.params.deviceId;
        const sensorName = req.params.sensor;
        const startTime = Number(req.params.startTime);
        const endTime = Number(req.params.endTime);

        const readings = await DeviceReading.aggregate([
            {$match: 
                {
                    deviceId: deviceId,
                    $and: [
                        {date: {$gte: getDateFlooredAtHours(startTime)}},
                        {date: {$lte: getDateCeiledAtHours(endTime)}}
                    ]
                }
            },
            {$project:
                {
                    _id: 0,
                    date: 1,
                    'hourReadings': {
                        [sensorName]: 1
                    }
                }
            }
        ]).sort({date: 1});

        if (readings.length == 0) {
            return res.status(404).send({
                message: 'No readings found for specified device'
            });
        }

        return res.status(200).send(readings);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: getStatusText(500)
        });
    }
});

router.post('/:deviceId/:startTime&:endTime', middleware, async (req, res) => {

    try {
        const deviceId = req.params.deviceId;
        const startTime = Number(req.params.startTime);
        const endTime = Number(req.params.endTime);

        const sensors = JSON.parse(req.body);
        
        const projObj = {};
        sensors.forEach(sens => {
            projObj[sens] = 1;
        });

        const readings = await DeviceReading.aggregate([
            {$match: 
                {
                    deviceId: deviceId,
                    $and: [
                        {date: {$gte: getDateFlooredAtHours(startTime)}},
                        {date: {$lte: getDateCeiledAtHours(endTime)}}
                    ]
                }
            },
            {$project:
                {
                    _id: 0,
                    date: 1,
                    'hourReadings': projObj
                }
            }
        ]).sort({date: 1});

        if (readings.length == 0) {
            return res.status(404).send({
                message: 'No readings found for specified device'
            });
        }

        return res.status(200).send(readings);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: getStatusText(500)
        });
    }
});

module.exports = router;



function removeOverSteppingReadings(hourReadings, endDate) {
    const minutes = endDate.getMinutes();
    const seconds = endDate.getSeconds();
    const filteredReadings = hourReadings.filter((reading) => 
        reading.minutes < minutes 
        || reading.minutes == minutes && reading.seconds <= seconds);
    return filteredReadings;
}

function removeSubSteppingReadings(hourReadings, startDate) {
    const minutes = startDate.getMinutes();
    const seconds = startDate.getSeconds();
    const filteredReadings = hourReadings.filter((reading) => 
        reading.minutes > minutes 
        || reading.minutes == minutes && reading.seconds >= seconds);
    return filteredReadings;
}