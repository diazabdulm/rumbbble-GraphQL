const metascraper = require("metascraper")([require("metascraper-image")()]);
const axios = require("axios");

module.exports.getFirstThumbnail = async (urls) => {
  for (const url of urls) {
    const { data: html } = await axios(url);
    const { image } = await metascraper({ html, url });
    if (image) return image;
  }
};
