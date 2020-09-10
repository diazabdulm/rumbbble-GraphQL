const { Schema, model } = require("mongoose");

const Like = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("likes", Like);
