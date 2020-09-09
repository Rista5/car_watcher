const Joi = require('joi');

const createRentalSchema = Joi.object().keys({
    renterId: Joi.string().guid().required(),
    vehicleId: Joi.string().guid().required()
});

module.exports = {
    createRentalSchema: createRentalSchema
}