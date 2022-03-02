const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create a new user, POST method.
//
//
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    //Utilize bcrypt to hide the user password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    //The 'User' is defined in the model
    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: hashedPassword,
    });

    let savedUser = await newUser.save();

    res
      .status(200)
      .send({ message: "New user has been saved.", payload: savedUser });
  } catch (error) {
    //errorHandler is used here in case of an error from mongoDB
    res.status(500).json({ error: errorHandler(error) });
  }
};

//Login to an existing user, get jsonwebtoken, POST method.
//
//
const userLogin = async (req, res, next) => {
  try {
    console.log(req.body);
    res.send("userLogin is running");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { createUser, userLogin };
