const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    deviceId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    platform: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCollecting: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}

class Device extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema, {
            sequelize,
            tableName: 'device'
        });
    }

    static associate(models) {
        this.belongsTo(models.Vehicle, {
            as: 'vehicle',
            foreignKey: 'vehicleId'
        });

        this.Sensor = this.hasMany(models.Sensor, {
            as: 'attachedSensors',
            foreignKey: 'deviceId'
        });
    }
}

module.exports = Device;