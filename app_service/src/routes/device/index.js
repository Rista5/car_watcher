const { Router } = require('express');
const { Device, Sensor } = require('./../../models');
const validate = require('./../../middleware/validate');
const {
    createSensorSchema,
    updateSensorSchema,
    createDeviceSchema,
    updateDeviceSchema
} = require('./../../requests');
const { publishDeviceSaved, 
    publishDeviceStatusUpdated } = require('./../../broker');

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const devices = await Device.findAll({
            include: [
                {
                    model: Sensor,
                    as: 'attachedSensors'
                }
            ]
        });

        return res.status(200).send(devices);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.get('/vehicleId/:vehicleId', async (req, res) => {
    try {
        const { vehicleId } = req.params;
        
        if (!vehicleId) {
            return res.status(500).send({message: 'Bad request'});
        }

        const device = await Device.findOne({
            where: {vehicleId: vehicleId},
            include: [
                {
                    model: Sensor,
                    as: 'attachedSensors'
                }
            ]
        });

        if (!device) {
            return res.status(200).send({message: 'Device not found'});
        }

        return res.status(200).send(device);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(500).send({message: 'Bad request'});
        }

        const device = await Device.findOne({
            where: {id: id},
            include: [
                {
                    model: Sensor,
                    as: 'attachedSensors'
                }
            ]
        });

        if (!device) {
            return res.status(404).send({message: 'Device not found'});
        }

        return res.status(200).send(device);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.post('/', validate(createDeviceSchema), async (req,res) => {
    try {
        const device = req.body;

        const savedDevice = await Device.create(device, {
            include: [
                {
                    association: Device.Sensor
                }
            ]
        });

        await publishDeviceSaved(savedDevice);

        return res.status(200).send(savedDevice);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.put('/:id', validate(updateDeviceSchema), async (req,res) => {
    try {
        const { id } = req.params;

        if (!id || !req.body) {
            return res.status(500).send({message: 'Bad request'});
        }

        const update = req.body;
        const device = await Device.findByPk(id);

        const keys = Object.keys(update);
        keys.forEach(k => {
            device[k] = update[k];
        });

        await device.save();

        await publishDeviceStatusUpdated(device);

        return res.status(200).send(device);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.delete('/:deviceId', async (req,res) => {
    try {
        const { deviceId } = req.params;
        await Device.destroy({
            where: {id: deviceId}
        });

        return res.status(200).send(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.post('/sensor', validate(createSensorSchema), async (req,res) => {
    try {
        const deviceId = req.body.deviceId;

        if (!deviceId) {
            return  res.status(200).send('Missing ID of device');
        }

        await Sensor.create(req.body);

        const device = await Device.findOne({
            where: {id: deviceId},
            include: [
                {
                    model: Sensor,
                    as: 'attachedSensors'
                }
            ]
        });

        return res.status(200).send(device);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.put('/sensor/:id', validate(updateSensorSchema), async (req,res) => {
    try {
        const { id } = req.params;

        if (!id || !req.body) {
            return res.status(500).send({message: 'Bad request'});
        }

        const update = req.body;
        const sensor = await Sensor.findByPk(id);

        const keys = Object.keys(update);
        keys.forEach(k => {
            sensor[k] = update[k];
        });

        await sensor.save();

        return res.status(200).send(sensor);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.delete('/sensor/:sensorId', async (req,res) => {
    try {
        const { sensorId } = req.params;
        await Sensor.destroy({
            where: {id: sensorId}
        });

        return res.status(200).send(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

module.exports = router;
