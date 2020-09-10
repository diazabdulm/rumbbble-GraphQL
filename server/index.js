const express = require("express");
const passport = require("passport");
const session = require("cookie-session");
const mongoose = require("mongoose");
const compression = require("compression");
const enforce = require("express-sslify");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const schema = require("./schema");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 5000;

require("./models");
require("./services/passport");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.use(
  session({ secret: process.env.COOKIE_SECRET }),
  passport.initialize(),
  passport.session()
);

server.use("/auth", authRouter);
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(PORT);
