const { Schema, model } = require("mongoose");

const Post = new Schema({
  title: String,
  description: String,
  repositoryURL: String,
  projectURL: String,
  thumbnail: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("posts", Post);
