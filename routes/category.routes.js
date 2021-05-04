const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/category.controllers");
const categoryRouter = express.Router();

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const rolesHavePermission = [
  config.user_type.ADMIN,
  config.user_type.SUPER_ADMIN,
];

categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);

module.exports = { categoryRouter };
