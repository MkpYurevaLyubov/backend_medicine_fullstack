const { allOrders, createOrder, updateOrder, deleteOrder } = require('../../Models/db/requests')

module.exports.allOrders = async (req, res) => {
  try {
    const {id} = req.user;
    const {method, type} = req.query;
    let {from, to} = req.query;
    if (!from || from === 'Invalid date 00:00:00') from = '0001-01-01 00:00:00';
    if (!to || to === 'Invalid date 23:59:59') to = '9999-12-31 23:59:59';

    const orders = await allOrders(id, method, type, from, to);
    res.send(orders);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const {id} = req.user;
    const {patientsname, dateorder, complaints, doctorid} = req.body;
    if (!(patientsname && dateorder && complaints && doctorid)) return res.status(422).send("Error! Params not found!");

    const orders = await createOrder(patientsname, dateorder, complaints, doctorid, id);
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const {patientsname, dateorder, complaints, doctorid, id} = req.body;
    if (!(patientsname && dateorder && complaints && doctorid)) return res.status(422).send("Error! Params not found!");

    const orders = await updateOrder(patientsname, dateorder, complaints, doctorid, id);
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const {id} = req.query;
    if (!(id)) return res.status(422).send("Error! Id not found!");

    const orders = await deleteOrder(id);
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};