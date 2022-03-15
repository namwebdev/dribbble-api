const request = require("request");
const cherrio = require("cheerio");
const { Category, Shot } = require("../models/index");

const crawAllShot = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Category.findAll();
      let listImageExist = await Shot.findAll({
        attributes: ["image"],
      });
      listImageExist = listImageExist.map((shot) => shot.image);
      const listShot = [];
      for await (category of categories) {
        const shots = await crawlShotBelongCategory(category, listImageExist);
        if (shots) listShot.push(shots);
      }
      resolve(Array.prototype.concat.apply([], listShot));
    } catch (e) {
      reject(e);
    }
  });
};

const crawlShotBelongCategory = (category, listImageExist) => {
  return new Promise((resolve, reject) => {
    request(
      `https://dribbble.com/shots/popular/${category.tag}`,
      async (err, res, html) => {
        if (res.statusCode === 200) {
          const shots = [];
          try {
            const $ = cherrio.load(html);
            const shot = $(
              "#wrap > #wrap-inner > #content > #main > .shots-grid > .shot-thumbnail"
            );
            shot.each((i, el) => {
              const imageElement = $(el).find("img")[0].attribs["data-src"];
              if (!imageElement) return;

              const title = $(el).find(".shot-title").html();
              const link = $(el)
                .find("a.shot-thumbnail-link.dribbble-link.js-shot-link")
                .attr("href");

              const like = $(el).find("span.js-shot-likes-count").html();
              const view = $(el).find("span.js-shot-views-count").html();

              const author_name = $(el).find("span.display-name").html();
              const author_avatar = $(el).find("img.photo").attr("data-src");
              const author_link = $(el).find("a.hoverable").attr("href");

              const image = convertImageSize(imageElement);
              const isImageNotExist =
                listImageExist.findIndex((shotImage) => shotImage === image) ===
                -1;
              if (isImageNotExist) {
                const shot = {
                  title: removeEmojis(title),
                  link: getFullUrl(link),
                  image,
                  category_id: category.id,
                  author_name: removeEmojis(author_name),
                  author_avatar,
                  author_link: getFullUrl(author_link),
                  like: getNumber(like),
                  view: getNumber(view),
                };
                shots.push(shot);
              }
            });
            resolve(shots);
          } catch (e) {
            reject(e);
          }
        }
      }
    );
  });
};

const getFullUrl = (text) => {
  const rootUrl = `https://dribbble.com`;
  return rootUrl + text;
};

function removeEmojis(input) {
  var result = "";
  if (input.length == 0) return input;
  for (
    var indexOfInput = 0, lengthOfInput = input.length;
    indexOfInput < lengthOfInput;
    indexOfInput++
  ) {
    var charAtSpecificIndex = input[indexOfInput].charCodeAt(0);
    if (32 <= charAtSpecificIndex && charAtSpecificIndex <= 126) {
      result += input[indexOfInput];
    }
  }
  return result;
}
function getNumber(string) {
  return string.replace(/\n/g, "").trim();
}
function convertImageSize(url) {
  return url.replace("400x300", "1200x900");
}

module.exports = { crawAllShot, crawlShotBelongCategory };
