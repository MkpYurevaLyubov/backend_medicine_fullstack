const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateTokens = (id) => {
  return {
    access_token: jwt.sign(id, process.env.TOKEN_ACC_SECRET, {
      expiresIn: '15m',
    }),
    refresh_token: jwt.sign(id, process.env.TOKEN_RFR_SECRET, {
      expiresIn: '10d',
    })
  }
};
