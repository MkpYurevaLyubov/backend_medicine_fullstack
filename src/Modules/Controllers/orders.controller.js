const {
  allOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../Models/db/requests');

module.exports.allOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const { method, type } = req.query;
    let { from, to } = req.query;

    if (!from || from === 'Invalid dateT00:00:00.000Z')
      from = '0001-01-01T00:00:00.000Z';

    if (!to || to === 'Invalid dateT23:59:59.000Z')
      to = '9999-12-31T23:59:59.000Z';

    const orders = await allOrders(id, method, type, from, to);
    res.status(200).send(orders);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { patientsName, dateOrder, complaints, doctorId } = req.body;

    if (!(patientsName && dateOrder && complaints && doctorId))
      return res.status(422).send('Error! Params not found!');

    const order = await createOrder(
      patientsName,
      dateOrder,
      complaints,
      doctorId,
      id,
    );
    res.status(200).send(order);
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const { patientsName, dateOrder, complaints, doctorId, Id } = req.body;

    if (!(patientsName && dateOrder && complaints && doctorId))
      return res.status(422).send('Error! Params not found!');

    const orders = await updateOrder(
      patientsName,
      dateOrder,
      complaints,
      doctorId,
      Id,
    );
    return orders[0]
      ? res.status(200).send('Order update!')
      : res.status(404).send('Order not found!');
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(422).send('Error! Id not found!');

    const orders = await deleteOrder(id);
    return orders
      ? res.status(200).send('Order delete!')
      : res.status(404).send('Order not found!');
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};
