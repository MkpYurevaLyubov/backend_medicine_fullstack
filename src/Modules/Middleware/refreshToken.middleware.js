const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateTokens } = require('./generateToken.middleware');
const {
  findUser,
  userWithToken,
  deleteRfrTokenInUser,
} = require('../../Models/db/requests');

dotenv.config();

module.exports.refreshToken = (req, res) => {
  const refresh_token = req.headers.refreshtoken;

  if (!refresh_token) res.status(401).send('Error! Unauthorized!');

  jwt.verify(
    refresh_token,
    process.env.TOKEN_RFR_SECRET,
    async (err, result) => {
      if (err) {
        const { id } = jwt.decode(refresh_token, process.env.TOKEN_RFR_SECRET);
        await deleteRfrTokenInUser(id);
        return res.status(403).send('Error! Token not correct!');
      }
      const user = await findUser(result.id);
      if (refresh_token !== user.refreshToken)
        return res.status(403).send('Error! Token not correct!');

      const tokens = generateTokens({ id: result.id });
      await userWithToken(result.id, tokens.refresh_token);
      return res.status(203).send(tokens);
    },
  );
};
