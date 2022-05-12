const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const User = sequelize.define("users", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = User;