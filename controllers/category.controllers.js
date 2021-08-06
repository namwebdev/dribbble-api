const { Op } = require("sequelize");
const { Category } = require("../models/index");

const getCategories = async (req, res) => {
  const { name } = req.query;

  try {
    const categories = name
      ? await Category.findAll({
          where: { name: { [Op.like]: `%${name}%` } },
        })
      : await Category.findAll();
    res.status(200).json({ data: categories || [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const createCategory = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      Category.bulkCreate(req.body, { returning: true }).then((result) =>
        res.status(201).json({
          data: result,
          message: "Create list Category successfully",
        })
      );
      return;
    }
    const { name, tag } = req.body;
    const newCategory = await Category.create({ name, tag });
    res.status(201).json({
      data: newCategory,
      message: "Create Category successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
