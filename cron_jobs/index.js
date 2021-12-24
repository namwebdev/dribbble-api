const cron = require("node-cron");
const { Shot, Category } = require("../models");
const { crawAllShot } = require("../services/crawlShot");

const runCronJob = () => {
  cron.schedule("* 0-23 * * *", () => {
    crawl();
  });
};

const crawl = async () => {
  const categories = await Category.findAll();
  const listShotExist = await Shot.findAll();
  const shots = await crawAllShot(categories, listShotExist);
  await Shot.bulkCreate(shots, { returning: false });
};

module.exports = { runCronJob };
