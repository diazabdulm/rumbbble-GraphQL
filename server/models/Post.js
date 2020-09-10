const { Schema, model } = require("mongoose");

const Post = new Schema({
  title: String,
  description: String,
  repoURL: String,
  websiteURL: String,
  coverPhotoURL: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

model("posts", Post);
