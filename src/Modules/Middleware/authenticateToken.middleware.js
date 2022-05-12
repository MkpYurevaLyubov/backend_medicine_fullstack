const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.authenticateToken = (req, res, next) => {
  const access_token = req.headers.accesstoken;

  if (!access_token) res.status(401).send("Error! Unauthorized!");

  jwt.verify(access_token, process.env.TOKEN_ACC_SECRET, (err, result) => {
    if (err) return res.status(403).send("Error! Token expired!");
    req.user = result;
    return next();
  });
};
