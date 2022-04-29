const db = require('../../Models/db/db');

module.exports.allOrders = async (req, res) => {
  try {
    const {id} = req.user;
    const {method, type} = req.query;
    let {from, to} = req.query;
    if (!from || from === 'Invalid date 00:00:00') from = '0001-01-01 00:00:00';
    if (!to || to === 'Invalid date 23:59:59') to = '9999-12-31 23:59:59';

    let orders = await db.query(
      `SELECT orders.*, doctors.fullname FROM orders, doctors 
      WHERE userid='${id}' AND doctorid=doctors.id AND dateorder >= '${from}' AND dateorder <= '${to}'
      ORDER BY ${method || 'id'} ${type}, dateorder ASC`
    );

    orders = orders.rows;
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

    let orders = await db.query(`INSERT INTO orders 
      (
      patientsname,
        dateorder,
        complaints,
        doctorid,
        userid
      ) values (
        '${patientsname}',
        '${dateorder}',
        '${complaints}',
        '${doctorid}',
        '${id}'
      ) RETURNING *`);

    orders = orders.rows[0];
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const {patientsname, dateorder, complaints, doctorid, id} = req.body;
    if (!(patientsname && dateorder && complaints && doctorid)) return res.status(422).send("Error! Params not found!");

    let orders = await db.query(`UPDATE orders SET
      patientsname = '${patientsname}',
      dateorder = '${dateorder}',
      complaints = '${complaints}',
      doctorid = '${doctorid}'
    WHERE id = '${id}' RETURNING *`);

    orders = orders.rows[0];
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const {id} = req.query;
    if (!(id)) return res.status(422).send("Error! Id not found!");

    let orders = await db.query(`DELETE FROM orders WHERE id = '${id}' RETURNING *`);
    orders = orders.rows[0];
    res.send(orders);
  } catch (e) {
    res.status(422).send({e, message: 'Error! Params not correct!'});
  }
};