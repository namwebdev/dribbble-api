const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = () => {
  mkdirp.sync(`./public/images/`);
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      extensionImageList.includes(extension)
        ? cb(null, true)
        : cb(new Error("File not valid"));
    },
  });

  return upload.single("image");
};

module.exports = { uploadImage };
