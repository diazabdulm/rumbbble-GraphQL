const passport = require("passport");
const { Strategy: GithubStrategy } = require("passport-github");

const User = require("../models/User");

const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
};

const githubCallback = (_, __, { _json: profile }, done) => {
  const searchQuery = {
    githubID: profile.id,
  };

  const updates = {
    name: profile.name,
    location: profile.location,
    avatarURL: profile.avatar_url,
    bio: profile.bio,
    githubID: profile.id,
    githubUsername: profile.login,
  };

  const options = {
    upsert: true,
  };

  User.findOneAndUpdate(searchQuery, updates, options, (error, user) => {
    done(error, user);
  });
};

passport.use(new GithubStrategy(githubOptions, githubCallback));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => done(error, user));
});
