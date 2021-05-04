const express = require("express");
const { register, login } = require("../controllers/auth.controllers");
const { uploadAvatar } = require("../controllers/user.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadImage } = require("../middlewares/uploads/upload-image");
const { categoryRouter } = require("./category.routes");
const { shotRouter } = require("./shot.routes");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("API Version 1"));

// auth route
rootRouter.post("/register", register);
rootRouter.post("/login", login);
//

rootRouter.post("/upload-image", authenticate, uploadImage(), uploadAvatar);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/shots", shotRouter);

module.exports = { rootRouter };
