const db = require('../../Models/db/db');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../Middleware/generateToken.middleware');

module.exports.createUser = async (req, res) => {
  try {
    const { login } = req.body;
    let { password } = req.body;
    if (!(login && password)) res.status(404).send("Error! Params not found!");

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const user = await db.query(`INSERT INTO users (login, password) values ($1, $2) RETURNING *`, [login, password]);
    const token = generateAccessToken({ id: user.id });
    res.send(token);
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

module.exports.allDoctors = async (req, res) => {
  try {
    let doctors = await db.query(`SELECT * FROM doctors`);
    doctors = doctors.rows;
    res.send(doctors);
  } catch (e) {
    res.status(422).send(e);
  }
};