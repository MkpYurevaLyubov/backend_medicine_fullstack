const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');
const User = require('./Model/user.model');
const Doctor = require('./Model/doctor.model');
const Order = require('./Model/order.models');

Doctor.hasMany(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
Order.belongsTo(Doctor);

User.hasMany(Order, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
Order.belongsTo(User);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Tables have been created');
  })
  .catch((err) => console.log(err));

module.exports = {
  User,
  Doctor,
  Order,
};
