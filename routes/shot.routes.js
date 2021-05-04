const express = require("express");
const {
  getAllShot,
  crawlShot,
} = require("../controllers/shot.controllers");
const shotRouter = express.Router();

shotRouter.get("/", getAllShot);
shotRouter.get("/crawl", crawlShot);

module.exports = { shotRouter };
