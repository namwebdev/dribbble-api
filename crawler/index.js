const request = require("request");
const cherrio = require("cheerio");

const crawler = () => {
  request(`https://dribbble.com/`, (err, res, html) => {
    if (res.statusCode === 200) {
      try {
        const $ = cherrio.load(html);
        const shot = $(
          "#wrap > #wrap-inner > #content > #main > .shots-grid > .shot-thumbnail "
        );
        shot.each((i, el) => {
          const title = $(el).find(".shot-title").html();
          const link = $(el)
            .find("a.shot-thumbnail-link.dribbble-link.js-shot-thumbnail-link")
            .attr("href");
          const image = $(el)
            .find("img.lazyload")
            .attr("src")
            .replace("400x300", "1200x900");
          const video = $(el).find(".video").html();

          const detailContainer = $(el).find(".display-name").html();
          const userAvatar = $(el).find("img.photo").attr("data-src");
          const userLink = $(el).find("a.hoverable").attr("href");
          const user = {
            name: detailContainer,
            avatar: userAvatar,
            link: userLink,
          };
          const shot = {
            title,
            link,
            image,
            user: { name: detailContainer, avatar: userAvatar, link: userLink },
          };
          console.log(shot, video);
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
};

module.exports = crawler;
