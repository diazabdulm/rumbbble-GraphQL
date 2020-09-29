const express = require("express");
const passport = require("passport");
const session = require("cookie-session");
const mongoose = require("mongoose");
const compression = require("compression");
const enforce = require("express-sslify");
const { graphqlHTTP } = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload")

const server = express();
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
  graphqlUploadExpress({ maxFiles: 1, maxFileSize: 10000000 }),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

if (process.env.NODE_ENV === "production") {
  server.use(compression());
  server.use(enforce.HTTPS({ trustProtoHeader: true }));
  server.use(express.static(path.join(__dirname, "client/build")));

  server.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(PORT);
