const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Ability extends Model {}

Ability.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    index_personagem: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Personagem',
            key: 'id'
        },
        allowNull: false
    },
    cha: {
        type: DataTypes.INTEGER
    },
    dex: {
        type: DataTypes.INTEGER
    },
    int: {
        type: DataTypes.INTEGER
    },
    str: {
        type: DataTypes.INTEGER
    },
    wis: {
        type: DataTypes.INTEGER
    },
    con: {
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    modelName: 'Ability',
    tableName: 'ability_personagem',
    timestamps: false
});

const Personagem = require("./Personagem");


// Ability.belongsTo(Personagem, {
//     foreignKey: 'index_personagem',
//     as: 'Personagem',
// });


module.exports = Ability;