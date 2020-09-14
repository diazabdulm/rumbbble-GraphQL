const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    ["/auth", "/graphql"],
    createProxyMiddleware({ target: "http://localhost:5000" })
  );
};
