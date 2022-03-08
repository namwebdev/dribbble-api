const cron = require("node-cron");
const { Shot, Category } = require("../models");
const { crawAllShot } = require("../services/crawlShot");

const runCronJob = () => {
  cron.schedule("1 */1 * * *", () => {
    crawl();
  });
};

const crawl = async () => {
  const categories = await Category.findAll();
  const listImageExist = await Shot.findAll({
    attributes: ["image"],
  });
  const shots = await crawAllShot(categories, listImageExist);
  await Shot.bulkCreate(shots, { returning: false });
};

module.exports = { runCronJob };
