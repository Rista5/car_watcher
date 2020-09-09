const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
});

const updateUserSchema = Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string()
});

module.exports = {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema
}