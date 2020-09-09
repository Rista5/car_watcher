const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    maxSpeed: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}

class Vehicle extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema, {
            sequelize,
            tableName: 'vehicle'
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            as: 'owner',
            foreignKey:'ownerId'
        });

        this.belongsToMany(models.User, {
            through: {
                model: models.Rental,
                unique: false
            },
            as: 'rentedVehicle',
            foreignKey: 'vehicleId',
            // unique: false
        });

        this.hasOne(models.Device, {
            as: 'device',
            foreignKey: 'vehicleId'
        });
    }
}

module.exports = Vehicle;