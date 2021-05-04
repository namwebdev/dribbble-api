const express = require("express");
const { register } = require("../controllers/user.controllers");
const userRouter = express.Router();


module.exports = { userRouter };
