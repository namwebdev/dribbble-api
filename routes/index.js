const express = require("express");
const { register, login } = require("../controllers/auth.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { categoryRouter } = require("./category.routes");
const { shotRouter } = require("./shot.routes");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("API Version 1"));

// auth route
rootRouter.post("/register", register);
rootRouter.post("/login", login);
//

rootRouter.use("/categories", categoryRouter);
rootRouter.use("/shots", shotRouter);

module.exports = { rootRouter };
