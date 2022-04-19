const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) res.status(401).send("Error! Unauthorized!");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Error! Forbidden!");
    req.user = user;
    next();
  });
};