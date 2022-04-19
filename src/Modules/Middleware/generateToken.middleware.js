const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateAccessToken = (id) => {
  return jwt.sign(id, process.env.TOKEN_SECRET);
};
