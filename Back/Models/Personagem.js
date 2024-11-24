const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Class = require("./Class");
const Race = require("./Race");


class Personagem extends Model {}

Personagem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class_index: {
        type: DataTypes.STRING,
        references: {
            model: 'Class',
            key: 'index_name'
        },
        allowNull: true
    },
    race_index: {
        type: DataTypes.STRING,
        references: {
            model: 'Race',
            key: 'index_name'
        },
        allowNull: true
    }
    }, {
    sequelize,
        modelName: 'Personagem',
        tableName: 'personagem',
        timestamps: false
});

Personagem.belongsTo(Class, { foreignKey: 'class_index' });
Personagem.belongsTo(Race, { foreignKey: 'race_index', targetKey: 'index_name' });

const Ability = require("./Ability"); // Importa a instância do Sequelize


Personagem.hasOne(Ability, {
    foreignKey: 'index_personagem',
    as: 'Ability',
});


module.exports = Personagem;