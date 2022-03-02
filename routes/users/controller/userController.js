const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    res.status(200).send({ message: "createUser beginning" });
  } catch (error) {
    res.status(500).json({ error: errorHandler(error) });
  }
};

module.exports = { createUser };
