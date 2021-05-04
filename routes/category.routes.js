const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/category.controllers");
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);

module.exports = { categoryRouter };
