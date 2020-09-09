const { Device } = require('../models/device');


module.exports = async (request, response, next) => {
    try {
        const deviceId = request.params.deviceId;

        const sensor = await Device.findOne({
            deviceId: deviceId
        });

        if (sensor) {
            next();
        } else {
            return response.status(404).send({
                message: 'Device unknown or not registered'
            });    
        }

    } catch (error) {
        console.error(error);
        return response.status(404).send({
            message: 'Device unknown or not registered'
        });
    }
}