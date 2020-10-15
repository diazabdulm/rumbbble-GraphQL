const metascraper = require("metascraper")([require("metascraper-image")()]);
const axios = require("axios");

module.exports.getThumbnail = async (url) => {
  const { data: html } = await axios(url);
  const { image } = await metascraper({ html, url });

  return image;
};

const urls = [
  "https://github.com/diazabdulm/rumbbble-GraphQL",
  "https://github.com/diazabdulm/rumbbble",
];

const thumbnail = urls.find(async (url) => await this.getThumbnail(url));

console.log(thumbnail);
