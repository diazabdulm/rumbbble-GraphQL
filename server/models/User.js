const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  location: String,
  avatarURL: String,
  bio: String,
  githubID: Number,
  githubUsername: String,
});

module.exports = model("users", User);
