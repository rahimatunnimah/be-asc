const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send(`No authorization token!`);
    }

    const decoded = jwt.verify(
      token.substring(7, token.length),
      process.env.PRIVATE_KEY
    );
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).send("Expired token!");
  }
};

module.exports = { checkToken };
