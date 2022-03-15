const cron = require("node-cron");
const { Shot } = require("../models");
const { crawAllShot } = require("../services/crawlShot");

const runCronJob = () => {
  cron.schedule("1 */2 * * *", () => {
    crawl();
  });
};

const crawl = async () => {
  const shots = await crawAllShot();
  await Shot.bulkCreate(shots, { returning: false });
};

module.exports = { runCronJob };
