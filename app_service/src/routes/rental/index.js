const { Router } = require('express');
const { Rental, Vehicle, User } = require('./../../models');
const validate = require('./../../middleware/validate');
const {createRentalSchema} = require('./../../requests');

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const rentals = await Rental.findAll({
            include: [{
                model: User,
                as: 'renter',
                attributes: ['username'],
            }, {
                model: Vehicle,
                as: 'rentedVehicle',
                attributes: ['brand', 'model']
            }]
        });

        return res.status(200).send(rentals);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(500).send({message: 'Bad request'});
        }

        const rentals = await Rental.findAll({
            where: {renterId: userId},
            include: {
                model: Vehicle,
                as: 'rentedVehicle',
            }
        });

        if (rentals.length == 0) {
            return res.status(404).send({message: 'Rental not found'});
        }

        return res.status(200).send(rentals);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.get('/vehicle/:vehicleId', async (req, res) => {
    try {
        const { vehicleId } = req.params;
        
        if (!vehicleId) {
            return res.status(500).send({message: 'Bad request'});
        }

        const rental = await Rental.findAll({
            where: {vehicleId: vehicleId},
            include: [
                {
                    model: User,
                    as: 'renter'
                }
            ]
        });

        if (rental > 0) {
            return res.status(404).send({message: 'Rental not found'});
        }

        return res.status(200).send(rental);

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

        const rental = await Rental.findByPk(id);

        if (!rental) {
            return res.status(404).send({message: 'Rental not found'});
        }

        return res.status(200).send(rental);

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

router.post('/', validate(createRentalSchema), async (req,res) => {
    try {
        const { renterId, vehicleId } = req.body;

        const savedRental = await Rental.findAll({
            where: {
                vehicleId: vehicleId,
                to: null
            }
        });

        if (savedRental.length > 0) {
            return res.status(500).send({message: 'Vehicle already rented'});
        }

        const vehicle = await Vehicle.findByPk(vehicleId);
        if (vehicle.ownerId === renterId) {
            return res.status(500).send({message: 'User cant rent its own vehicle'});
        }

        const date = new Date();
        const rental = await Rental.create({
            renterId: renterId,
            vehicleId: vehicleId,
            from: date
        });

        const rentalWithAssoc = await Rental.findByPk(rental.id, {
            include: [{
                model: User,
                as: 'renter',
                attributes: ['username'],
            }, {
                model: Vehicle,
                as: 'rentedVehicle',
                attributes: ['brand', 'model']
            }]
        })

        return res.status(200).send(rentalWithAssoc);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.put('/end/:rentalId', async (req,res) => {
    try {
        const { rentalId } = req.params;

        const rental = await Rental.findByPk(rentalId, {
            include: [{
                model: User,
                as: 'renter',
                attributes: ['username'],
            }, {
                model: Vehicle,
                as: 'rentedVehicle',
                attributes: ['brand', 'model']
            }]
        });

        if (rental.to) {
            return res.status(500).send({message: 'Rental already has end date'});
        }

        rental.to = Date.now();

        await rental.save();

        return res.status(200).send(rental);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const rental = req.body;

        // const savedRental = await Rental.findByPk(id);

        const savedRental = await Rental.update(rental, {
            where: {id: id}
        });

        if (!savedRental) {
            return res.status(404).send({message: 'Vehicle not found'});
        }
        // const keys = Object.keys(rental);
        // keys.forEach(k => {
        //     savedRental[k] = rental[k];
        // });
        // await savedRental.save();

        return res.status(200).send(savedRental);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
});

module.exports = router;