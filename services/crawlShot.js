const request = require("request");
const cherrio = require("cheerio");

const crawAllShot = (categories, listImageExist) => {
  return new Promise(async (resolve, reject) => {
    try {
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
              "#wrap > #wrap-inner > #content > #main > .shots-grid > .shot-thumbnail "
            );
            shot.each((i, el) => {
              const title = $(el).find(".shot-title").html();
              const link = $(el)
                .find("a.shot-thumbnail-link.dribbble-link.js-shot-link")
                .attr("href");
              const image = $(el)
                .find("img.lazyautosizes.lazyloaded")
                .attr("src")
                .replace("400x300", "1200x900");
              const like = $(el).find("span.js-shot-likes-count").html();
              const view = $(el).find("span.js-shot-views-count").html();

              const author_name = $(el).find(".display-name").html();
              const author_avatar = $(el).find("img.photo").attr("data-src");
              const author_link = $(el).find("a.hoverable").attr("href");

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

function removeEmojis(string) {
  var regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, "");
}
function getNumber(string) {
  return string.replace(/\n/g, "").trim();
}

module.exports = { crawAllShot, crawlShotBelongCategory };
