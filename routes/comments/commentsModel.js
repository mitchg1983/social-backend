const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
