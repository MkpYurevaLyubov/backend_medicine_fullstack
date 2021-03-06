const bcrypt = require('bcryptjs');
const { generateTokens } = require('../Middleware/generateToken.middleware');
const {
  createUser,
  userWithToken,
  authUser,
  createDoctor,
  allDoctors,
  deleteRfrTokenInUser,
} = require('../../Models/db/requests');

module.exports.createUser = async (req, res) => {
  try {
    const { login } = req.body;
    let { password } = req.body;
    if (!(login && password)) res.status(404).send('Error! Params not found!');

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const user = await createUser(login, password);
    const token = generateTokens({ id: user.Id });
    await userWithToken(user.Id, token.refresh_token);
    res.status(200).send(token);
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.authUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password)) res.status(404).send('Error! Params not found!');

    const user = await authUser(login);

    if (!bcrypt.compareSync(password, user.password))
      res.status(422).send('Error! Password not correct!');

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateTokens({ id: user.Id });
      await userWithToken(user.Id, token.refresh_token);
      res.status(200).send(token);
    }
  } catch (e) {
    res.status(422).send({ e, message: 'Error! Params not correct!' });
  }
};

module.exports.createDoctor = async (req, res) => {
  try {
    const { fullName } = req.body;
    const doctor = await createDoctor(fullName);
    res.status(200).send(doctor);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.allDoctors = async (req, res) => {
  try {
    const doctors = await allDoctors();
    res.status(200).send(doctors);
  } catch (e) {
    res.status(422).send(e);
  }
};

module.exports.deleteRfrTokenInUser = async (req, res) => {
  try {
    const { id } = req.user;
    await deleteRfrTokenInUser(id);
    res.status(200).send('Refresh token delete');
  } catch (e) {
    res.status(422).send(e);
  }
};
