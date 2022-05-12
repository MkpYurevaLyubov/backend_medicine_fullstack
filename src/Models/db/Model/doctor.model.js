const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const Doctor = sequelize.define('doctors', {
  Id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
});

module.exports = Doctor;
