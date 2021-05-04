const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

const token_secret_key = config.token_secret_key;

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, token_secret_key);
    if (decode) {
      req.user = decode;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticate };
