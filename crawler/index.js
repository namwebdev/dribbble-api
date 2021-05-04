const request = require("request");
const cherrio = require("cheerio");
const { Category, Shot } = require("../models/index");

const crawler = async () => {
  try {
    await Shot.destroy({ truncate: true });
    const categories = await Category.findAll();
    for await (const category of categories) {
      await crawlShotBelongCategory(category);
    }
  } catch (err) {
    console.log(err);
  }
};

const crawlShotBelongCategory = (category) => {
  request(
    `https://dribbble.com/shots/popular/${category.tag}`,
    async (err, res, html) => {
      if (res.statusCode === 200) {
        const shots = [];
        try {
          const $ = cherrio.load(html);
          const shot = $(
            "#wrap > #wrap-inner > #content > #main > .shots-grid > .shot-thumbnail "
          );
          shot.each((i, el) => {
            const title = $(el).find(".shot-title").html();
            const link = $(el)
              .find(
                "a.shot-thumbnail-link.dribbble-link.js-shot-thumbnail-link"
              )
              .attr("href");
            const image = $(el)
              .find("img.lazyload")
              .attr("src")
              .replace("400x300", "1200x900");
            const author_name = $(el).find(".display-name").html();
            const author_avatar = $(el).find("img.photo").attr("data-src");
            const author_link = $(el).find("a.hoverable").attr("href");

            const shot = {
              title,
              link: getFullUrl(link),
              image,
              category_id: category.id,
              author_name,
              author_avatar,
              author_link: getFullUrl(author_link),
            };
            shots.push(shot);
          });
          await Shot.bulkCreate(shots, { returning: true });
        } catch (e) {
          console.log(e);
        }
      }
    }
  );
};

const getFullUrl = (text) => {
  const rootUrl = `https://dribbble.com`;
  return rootUrl + text;
};

module.exports = crawler;
