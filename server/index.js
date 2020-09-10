const server = require("express")();
const passport = require("passport");
const session = require("cookie-session");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 5000;

require("./models");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.use(session({ secret: process.env.COOKIE_SECRET }));
server.use(passport.initialize());
server.use(passport.session());
server.use("/auth", authRouter);
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

server.get("/", (request, response) => {
  response.send("nice!");
});

server.listen(PORT);
