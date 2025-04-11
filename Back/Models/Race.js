const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa a instância do Sequelize

class Race extends Model {}

Race.init({
    index_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    speed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alignment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    age: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size_description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
        modelName: 'Race',
        tableName: 'races',
        timestamps: false,
});

module.exports = Race;
