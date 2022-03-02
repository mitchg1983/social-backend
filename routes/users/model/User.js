const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,

    //code from ginny, app will crash until these schemas are created
    //
    // postHistory: [{ type: mongoose.Schema.ObjectID, ref: "post"}],
    // commentHistory: [{ type: mongoose.Schema.ObjectID, ref: "comment"}],


  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema)

