const { allOrders, createOrder, updateOrder, deleteOrder } = require('../../Models/db/requests');

module.exports.allOrders = async (req, res) => {
  try {
    const {id} = req.user;
    const {method, type} = req.query;
    let {from, to} = req.query;
    if (!from || from === 'Invalid dateT00:00:00.000Z') from = '0001-01-01T00:00:00.000Z';
    if (!to || to === 'Invalid dateT23:59:59.000Z') to = '9999-12-31T23:59:59.000Z';

    const orders = await allOrders(id, method, type, from, to);
    res.send(orders);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const {id} = req.user;
    const {patientsName, dateOrder, complaints, doctorId} = req.body;
    if (!(patientsName && dateOrder && complaints && doctorId)) return res.status(422).send('Error! Params not found!');

    const orders = await createOrder(patientsName, dateOrder, complaints, doctorId, id);
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const {patientsName, dateOrder, complaints, doctorId, Id} = req.body;
    if (!(patientsName && dateOrder && complaints && doctorId)) return res.status(422).send("Error! Params not found!");

    const orders = await updateOrder(patientsName, dateOrder, complaints, doctorId, Id);
    res.send(orders[0] ? 'Order update!' : 'Order not update!');
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const {id} = req.query;
    if (!(id)) return res.status(422).send('Error! Id not found!');

    const orders = await deleteOrder(id);
    res.send(orders ? 'Deleting order' : '');
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};