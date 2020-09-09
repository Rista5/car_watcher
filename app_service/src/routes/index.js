const { Router } = require('express');
const userRouter = require('./user');
const vehicleRouter = require('./vehicle');
const rentalRouter = require('./rental');
const deviceRouter = require('./device');

const router = Router();

router.use('/user', userRouter);
router.use('/vehicle', vehicleRouter);
router.use('/rental', rentalRouter);
router.use('/device', deviceRouter);

module.exports = router;