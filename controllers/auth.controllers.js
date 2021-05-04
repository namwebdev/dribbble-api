const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const { User } = require("../models/index");

const token_secret_key = config.token_secret_key;

const register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const avatarDefault =
    "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      avatar: avatarDefault,
    });
    res.status(201).json({ message: "Register success", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isAuth = bcrypt.compareSync(password, user.password);
      if (isAuth) {
        const token = jwt.sign(
          { email: user.email, type: user.type },
          token_secret_key,
          { expiresIn: 60 * 60 * 24 }
        );
        res.status(200).json({ message: "Login success", token });
      } else res.status(401).json({ message: "Email or password incorrect" });
    } else res.status(404).json({ message: "Email not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { register, login };
