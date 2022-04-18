const db = require('../../Models/db/db');
const bcrypt = require('bcryptjs');

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