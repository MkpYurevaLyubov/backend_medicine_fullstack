const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.authenticateToken = (req, res, next) => {
  const token = req.headers.accesstoken;

  if (token === undefined) res.status(401).send("Error! Unauthorized!");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Error! Token not correct!");
    req.user = user;
    next();
  });
};
