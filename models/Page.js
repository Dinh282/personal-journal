const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Page extends Model {}

Page.init(
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    journalId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'journal',
        key: 'id',
      },
      field: 'user_id',
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'page',
    freezeTableName: true,
  }
);

module.exports = Page;
