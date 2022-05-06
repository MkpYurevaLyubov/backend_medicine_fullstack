const {User, Doctor, Order} = require("./db");
const {Op} = require("@sequelize/core");

module.exports.createUser = async (login, password) => {
  const result = User.create({login, password});
  return result;
};

module.exports.authUser = async (login) => {
  const result = User.findOne({where: {login}})
  return result;
};

module.exports.createDoctor = async (fullName) => {
  const result = Doctor.create({fullName});
  return result;
};

module.exports.allDoctors = async () => {
  const result = Doctor.findAll();
  return result;
};

module.exports.allOrders = async (id, method, type, from, to) => {
  let orders = [`${method || "createdAt"}`, type];
  if (method === 'fullName') orders = ['doctor', 'fullName', type];
  const result = Order.findAll({
    where: {
      userId: id,
      dateOrder: { [Op.between]: [from, to] }
    },
    include: {
      model: Doctor,
      attributes: ["fullName"]
    },
    order: [
      orders,
      ["dateOrder", "ASC"]
    ]
  });
  return result;
};

module.exports.createOrder = async (patientsName, dateOrder, complaints, doctorId, id) => {
  const result = Order.create({patientsName, dateOrder, complaints, doctorId, "userId": id });
  return result;
};

module.exports.updateOrder = async (patientsName, dateOrder, complaints, doctorId, id) => {
  const result = Order.update({patientsName, dateOrder, complaints, doctorId}, {
    where: {
      Id: id
    }
  });
  return result;
};

module.exports.deleteOrder = async (id) => {
  const result = Order.destroy({
    where: {
      Id: id
    }
  });
  return result;
};