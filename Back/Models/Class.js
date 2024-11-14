const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa a instância do Sequelize

class Class extends Model {}

Class.init({
    index_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proficiency_bonus: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hit_die: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    multiclassing: {
        type: DataTypes.JSON,
        allowNull: true
    },
    starting_equipment: {
        type: DataTypes.JSON,
        allowNull: true
    },
    starting_equipment_options: {
        type: DataTypes.JSON,
        allowNull: true
    },
    proficiency_choices: {
        type: DataTypes.JSON,
        allowNull: true
    },
    saving_throws: {
        type: DataTypes.JSON,
        allowNull: true
    },
    subclasses: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    sequelize,  // Agora estamos passando a instância do Sequelize corretamente
    modelName: 'Class',
    tableName: 'class',  // Nome da tabela no banco
    timestamps: false    // Desabilita timestamps (createdAt, updatedAt) se não forem necessários
});

module.exports = Class;
