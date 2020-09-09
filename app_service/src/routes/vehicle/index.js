const { Router } = require('express');
const { Vehicle, Device, Sensor, User } = require('./../../models');
const validate = require('./../../middleware/validate');
const {createVehicleSchema, updateVehicleSchema} = require('./../../requests');

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            attributes: ['id', 'brand', 'model', 'maxSpeed', 
                'weight', 'ownerId'],
            include: {
                model: User,
                as: 'owner',
                attributes: ['username'],
            }
        });

        return res.status(200).send(vehicles);
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

        const vehicle = await Vehicle.findByPk(id);
        
        if(!vehicle) {
            return res.status(404).send({message: 'Vehicle not found'});
        }

        return res.status(200).send(vehicle);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.get('/owner/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
    
        if (!userId) {
            return res.status(500).send({message: 'Bad request'});
        }

        const vehicle = await Vehicle.findAll({
            where: {ownerId: userId},
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [
                        {
                            model: Sensor,
                            as: 'attachedSensors'
                        }
                    ]
                },
            ]
        });
        
        if(!vehicle) {
            return res.status(404).send({message: 'Vehicles not found'});
        }

        return res.status(200).send(vehicle);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.post('/', validate(createVehicleSchema), async (req,res) => {
    try {
        const vehicle = req.body;

        const savedVehicle = await Vehicle.create(vehicle);

        const vehicleWithOwner = await Vehicle.findByPk(savedVehicle.id, {
            attributes: ['id', 'brand', 'model', 'maxSpeed', 
                'weight', 'ownerId'],
            include: {
                model: User,
                as: 'owner',
                attributes: ['username'],
            }
        })

        return res.status(200).send(vehicleWithOwner);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.put('/:id', validate(updateVehicleSchema), async (req,res) => {
    try {
        const { id } = req.params
        const vehicle = req.body;

        const savedVehicle = await Vehicle.findByPk(id);

        if (!savedVehicle) {
            return res.status(404).send({message: 'Vehicle not found'});
        }

        const keys = Object.keys(vehicle);
        keys.forEach(k => {
            savedVehicle[k] = vehicle[k];
        });

        await savedVehicle.save();

        return res.status(200).send(savedVehicle);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

module.exports = router;