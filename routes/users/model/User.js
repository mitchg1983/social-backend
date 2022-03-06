const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    postHistory: [{ type: mongoose.Schema.ObjectId, ref: "post" }],
    commentHistory: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
