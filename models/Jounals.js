const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const User = require('./User');

class Journals extends Modal { }

Journals.init(
    {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        }

    },
    {
        sequelize,
        underscored: true,
        modelName: 'Journals',
    }
);

module.exports = Journals;