const Sequelize = require('sequelize');
const UserModel = require('./user');
const VehicleModel = require('./vehicle');
const RentalModel = require('./rental');
const DeviceModel = require('./device');
const SensorModel = require('./sensor');
const sequelize = require('../services/db');

const models = {
	User: UserModel.init(sequelize, Sequelize),
	Vehicle: VehicleModel.init(sequelize, Sequelize),
	Rental: RentalModel.init(sequelize, Sequelize),
	Device: DeviceModel.init(sequelize, Sequelize),
	Sensor: SensorModel.init(sequelize, Sequelize)
};

Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models));

sequelize.sync(
//   { force: true }
);

const db = {
    ...models,
    sequelize: sequelize
}

module.exports = db;