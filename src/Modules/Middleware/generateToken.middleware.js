const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateAccessToken = (userName) => {
  return jwt.sign(userName, process.env.TOKEN_SECRET);
};
