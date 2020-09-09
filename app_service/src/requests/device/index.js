const Joi = require('joi');

const valueTypes = ['float', 'string', 'integer'];

const sensorSchema = Joi.object().keys({
    type: Joi.string().required(),
    valueType: Joi.string().valid(...valueTypes).required()
});

const createDeviceSchema = Joi.object().keys({
    deviceId: Joi.string().required(),
    platform: Joi.string().required(),
    isCollecting: Joi.bool().required(),
    vehicleId: Joi.string().required(),
    attachedSensors: Joi.array().items(sensorSchema)
});

const createSensorSchema = Joi.object().keys({
    type: Joi.string().required(),
    valueType: Joi.string().valid(...valueTypes).required(),
    deviceId: Joi.string().guid().required()
});

const updateSensorSchema = Joi.object().keys({
    type: Joi.string().required(),
    valueType: Joi.string().valid(...valueTypes).required(),
    deviceId: Joi.string().guid().required()
});

const updateDeviceSchema = Joi.object().keys({
    deviceId: Joi.string(),
    platform: Joi.string(),
    isCollecting: Joi.bool()
});

module.exports = {
    createSensorSchema: createSensorSchema,
    createDeviceSchema: createDeviceSchema,
    updateDeviceSchema: updateDeviceSchema,
    updateSensorSchema: updateSensorSchema
}