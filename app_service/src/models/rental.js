const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    from: {
        type: Sequelize.DATE,
        allowNull: false
    },
    to: {
        type: Sequelize.DATE,
        allowNull: true,
    }
}

class Rental extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema, {
            sequelize,
            tableName: 'rental'
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            as: 'renter',
            foreignKey: 'renterId'
        });

        this.belongsTo(models.Vehicle, {
            as: 'rentedVehicle',
            foreignKey: 'vehicleId'
        });
    }
}

module.exports = Rental;