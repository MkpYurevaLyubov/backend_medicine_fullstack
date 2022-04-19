const db = require('../../Models/db/db');

module.exports.allOrders = async (req, res) => {
  try {
    const {id} = req.user;
    let orders = await db.query(`SELECT * FROM orders WHERE userid='${id}'`);
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
    res.status(422).send(e);
  }
};