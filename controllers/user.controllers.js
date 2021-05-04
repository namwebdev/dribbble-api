const { User } = require("../models/index");

const uploadAvatar = async (req, res) => {
  console.log("test");
  const { file, user } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const userFound = await User.findOne({ email: user.email });
  userFound.avatar = urlImage;
  await userFound.save();
  res.status(200).send(userFound);
};

module.exports = { uploadAvatar };
