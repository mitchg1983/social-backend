const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    post: String,
    owner: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
