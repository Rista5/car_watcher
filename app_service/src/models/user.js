const Sequelize = require('sequelize');

const schema = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema, {
            sequelize,
            tableName: 'user'
        });
    }

    static associate(models) {
        this.hasMany(models.Vehicle, {
            as: 'owner',
            foreignKey:'ownerId'
        });

        this.belongsToMany(models.Vehicle, {
            through: { 
                model: models.Rental,
                unique: false
            },
            as: 'renter',
            foreignKey: 'renterId',
            // unique: false
        });
    }
}

module.exports = User;