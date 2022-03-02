const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {

    const { firstName, lastName, email, username, password } = req.body;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(username);
    console.log(password);

    let errObj = {};

    res.status(200).send({ message: "createUser beginning" });
  } catch (error) {
    res.status(500).json({ error: errorHandler(error) });
  }
};

module.exports = { createUser };
