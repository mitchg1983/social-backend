const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    userName: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoosemodel("user", userSchema)