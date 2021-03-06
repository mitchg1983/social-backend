const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../../utils/index");

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
const userLogin = async (req, res) => {
  try {
    console.log("userLogin is running.");
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser === null) throw { message: "Email not found." };

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    console.log(matchPassword);

    if (!matchPassword) throw { message: "Email & Password do not match." };

    const jwtToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        username: foundUser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );
    res.status(200).json({ payload: jwtToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update User Profile, PUT method
//
//
const updateProfile = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    const updatedUser = await User.findOneAndUpdate(
      { email: decodedToken.email },
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "User is updated.", payload: updatedUser });
  } catch (error) {
    res.status(500).json({ error: errorHandler(error) });
  }
};

//Get Current User, GET method
//
//
const getCurrentUser = async (req, res) => {
  try {
    const { decodedToken } = res.locals;
    const foundUser = await User.findOne({
      email: decodedToken.email,
    });

    res
      .status(200)
      .json({ message: "Current user information.", payload: foundUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error from getCurrentUser.", error: error.message });
  }
};

////////////////////////////////////////////////////////////////////////
//NOTES
/////////////////
//Move emptyCheck out of authMiddleware to a new 'utils' folder

module.exports = { createUser, userLogin, updateProfile, getCurrentUser };
