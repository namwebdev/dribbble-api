const { Shot, Category } = require("../models/index");
const { Op } = require("sequelize");
const {
  crawlShotBelongCategory,
  crawAllShot,
} = require("../services/crawlShot");
const { setPagination } = require("../services/pagination");

const getAllShot = async (req, res) => {
  const order = [["id", "DESC"]];
  const { page = 1, limit = 12, category_id } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  let params = { order, limit: Number(limit), offset };

  try {
    if (category_id) {
      const cate = await Category.findOne({ where: { id: category_id } });
      if (cate) params = { ...params, ...{ where: { category_id } } };
      else {
        res.status(404).json({ message: "Category not found" });
        return;
      }
    }

    const { count, rows: shots } = await Shot.findAndCountAll(params);
    const pagination = setPagination(
      Number(page),
      Number(limit),
      Number(count)
    );
    res.status(200).json({ data: shots || [], pagination });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};

const crawlShot = async (req, res) => {
  const { category, is_refresh } = req.query;
  let shots = [];
  try {
    if (category) {
      const cate = await Category.findOne({
        where: { name: { [Op.like]: `%${category}%` } },
      });
      if (cate) {
        if (is_refresh) await Shot.destroy({ truncate: true });
        shots = await crawlShotBelongCategory(cate);
        await Shot.bulkCreate(shots, { returning: true });
        res.status(201).json({
          message: `Crawl Shot for category "${category}" successfully`,
        });
      } else {
        res.status(404).json({ message: `Category ${category} not found` });
      }
      return;
    }

    if (is_refresh) await Shot.destroy({ truncate: true });
    const categories = await Category.findAll();
    const listShotExist = await Shot.findAll();
    shots = await crawAllShot(categories, listShotExist);
    await Shot.bulkCreate(shots, { returning: true });
    res.status(201).json({
      message: `Crawl Shot successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = { getAllShot, crawlShot };
