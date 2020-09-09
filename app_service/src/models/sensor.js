const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valueType: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}

class Sensor extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema, {
            sequelize,
            tableName: 'sensor'
        });
    }

    static associate(models) {
        this.belongsTo(models.Device, {
            as: 'belongsToDevice',
            foreignKey: 'deviceId'
        });
    }
}

module.exports = Sensor;