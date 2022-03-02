const {
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require("validator");

//MIDDLEWARE
function valiDataCreate(req, res, next) {
  let errObj = {};

  const { firstName, lastName, email, username, password } = req.body;

  //Check the user entered data against the validator
  if (!isAlpha(firstName)) {
    errObj.firstName = "First name can only include letters.";
  }

  if (!isAlpha(lastName)) {
    errObj.firstName = "Last name can only include letters.";
  }

  if (!isAlphanumeric(username)) {
    errObj.username =
      "Username cannot contain any special characters, or spaces.";
  }

  if (!isEmail(email)) {
    errObj.email = "Please enter a valid email address.";
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      "Password must contain 1 Lowercase, 1 Uppercase, 1 Number, 1 Special Character. Minimum length - 8 characters long.";
  }

  //gather any & all errors, return to user
  let checkObj = Object.keys(errObj);
  if (checkObj.length > 0) {
    return res
      .status(500)
      .json({ message: "Error from inside valiDataCreate", error: errObj });
  } else {
    next();
  }
}

module.exports = { 
    valiDataCreate,
}