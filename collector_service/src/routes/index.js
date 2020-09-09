const { Router } = require('express');
const sensReadingRouter = require('./device-reading');
const sensReadingMiddleware = require('../middleware/device-reading');

const router = Router();

router.use('/dev-read', sensReadingRouter);

module.exports = router;