const passport = require("passport");
const { Strategy: GithubStrategy } = require("passport-github");

const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
};

const githubCallback = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  // logic to deserialize here
  done(null, id);
});

passport.use(new GithubStrategy(githubOptions, githubCallback));
