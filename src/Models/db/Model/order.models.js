const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const Order = sequelize.define("orders", {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  patientsName: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  dateOrder: {
    type: DataTypes.DATE,
    allowNull: false
  },
  complaints: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Order;