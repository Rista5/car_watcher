const {createUserSchema, updateUserSchema} = require('./user');
const {createVehicleSchema, updateVehicleSchema} = require('./vehicle');
const {createRentalSchema} = require('./rental');
const {createSensorSchema, 
    updateSensorSchema,
    createDeviceSchema, 
    updateDeviceSchema} = require('./device');

module.exports = {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema,
    createVehicleSchema: createVehicleSchema,
    updateVehicleSchema: updateVehicleSchema,
    createRentalSchema: createRentalSchema,
    createSensorSchema: createSensorSchema,
    updateSensorSchema: updateSensorSchema,
    createDeviceSchema: createDeviceSchema,
    updateDeviceSchema: updateDeviceSchema
}