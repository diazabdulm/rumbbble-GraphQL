const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  location: String,
  profilePicture: String,
  bio: String,
  githubID: Number,
  githubUsername: String,
});

model("users", User);
