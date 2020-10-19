const metascraper = require("metascraper")([require("metascraper-image")()]);
const axios = require("axios");

module.exports.getFirstThumbnail = async (urls) => {
  for (const url of urls) {
    const { data: html } = await axios(url);
    const { thumbnail } = await metascraper({ html, url });

    if (thumbnail) return thumbnail;
  }
};
