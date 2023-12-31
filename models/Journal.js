const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Journal extends Model {}

Journal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      field: 'user_id',
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'journal',
  }
);

module.exports = Journal;
