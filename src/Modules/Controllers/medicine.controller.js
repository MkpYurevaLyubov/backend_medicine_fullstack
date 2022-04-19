const db = require('../../Models/db/db');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../Middleware/generateToken.middleware');

module.exports.createUser = async (req, res) => {
  try {
    const { login } = req.body;
    let { password } = req.body;
    if (!(login && password)) res.status(404).send("Error! Params not found!");

    const salt = bcrypt.genSaltSync(process.env.SALT);
    password = bcrypt.hashSync(password, salt);

    const newPerson = await db.query(`INSERT INTO users (login, password) values ($1, $2) RETURNING *`, [login, password]);
    res.send(newPerson.rows[0]);
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.authUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) res.status(404).send('Error! Params not found!');

    let user = await db.query(`SELECT * FROM users WHERE login='${login}'`);
    user = user.rows[0];

    if (!bcrypt.compareSync(password, user.password)) res.status(422).send('Error! Password not correct!');
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateAccessToken({ id: user.id });
      res.send(token);
    }
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.allOrders = async (req, res) => {
  try {
    const { id } = req.user;
    let orders = await db.query(`SELECT * FROM orders WHERE userid='${id}'`);
    orders = orders.rows;
    res.send(orders);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.allDoctors = async (req, res) => {
  try {
    let doctors = await db.query(`SELECT * FROM doctors`);
    doctors = doctors.rows;
    res.send(doctors);
  } catch (e) {
    res.status(422).send(e);
  }
};