const Joi = require('joi');

const createVehicleSchema = Joi.object().keys({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    maxSpeed: Joi.number().positive().required(),
    weight: Joi.number().positive().required(),
    ownerId: Joi.string().required()
});

const updateVehicleSchema = Joi.object().keys({
    maxSpeed: Joi.number().positive(),
    weight: Joi.number().positive()
});

module.exports = {
    createVehicleSchema: createVehicleSchema,
    updateVehicleSchema: updateVehicleSchema
}