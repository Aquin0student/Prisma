const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class RacesAbilityBonuses extends Model {}

RacesAbilityBonuses.init({
    race_index: {
        primaryKey: true,
        type: DataTypes.STRING,
        references: {
            model: 'Race',
            key: 'index_name'
        },
        allowNull: false
    },
    ability_bonus: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'RacesAbilityBonuses',
    tableName: 'races_ability_bonuses',
    timestamps: false
});

module.exports = RacesAbilityBonuses;