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
    res.status(422).send({ e, message: 'Error! Params not correct!' });
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
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.query;
    if (!(id)) return res.status(422).send("Error! Id not found!");

    let orders = await db.query(`DELETE FROM orders WHERE id = '${id}' RETURNING *`);
    orders = orders.rows[0];
    res.send(orders);
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};