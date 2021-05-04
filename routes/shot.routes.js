const express = require("express");
const {
  getAllShot,
  crawlShot,
} = require("../controllers/shot.controllers");
const shotRouter = express.Router();

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const rolesHavePermission = [
  config.user_type.ADMIN,
  config.user_type.SUPER_ADMIN,
];

shotRouter.get("/", getAllShot);
shotRouter.get("/crawl", crawlShot);

module.exports = { shotRouter };
