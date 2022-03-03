const { isEmail } = require("validator");

function valiDataLogin(req, res, next) {
  console.log("valiDataLogin running");

  const { email } = req.body;

  let errObj = {};

  if (!isEmail(email)) {
    errObj.email = "Invalid email entered.";
  }
  let checkObj = Object.keys(errObj);
  if (checkObj.length > 0) {
    return res
      .status(500)
      .json({ message: "Error from valiDataLogin", error: errObj });
  } else {
    next();
  }
}

module.exports = {
  valiDataLogin,
};
