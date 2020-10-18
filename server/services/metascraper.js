const metascraper = require("metascraper")([require("metascraper-image")()]);
const axios = require("axios");

module.exports = getFirstThumbnail = (urls) => {
  let thumbnail;

  urls.find(async (url) => {
    const { data: html } = await axios(url);
    const { image } = metascraper({ html, url });
    return image && (thumbnail = image);
  });

  return thumbnail;
};
