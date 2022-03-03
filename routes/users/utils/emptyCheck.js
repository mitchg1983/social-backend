const { isEmpty } = require("validator");

//MIDDLEWARE
function emptyCheck(req, res, next) {
  let errObj = {};
  let body = req.body;

  //Iterate through any & all keys in the req.body. 
  //add a new key-value pair to the errObj, with the 'key' listed that is empty
  //will not stop at one, will go through every key present
  for (let key in body) {
    if (isEmpty(body[key])) {
      errObj[key] = `${key} cannot be empty`;
    }
  }

  let checkObj = Object.keys(errObj);

  //This will return a collection of every error collected in the body
  if (checkObj.length > 0) {
    return res.status(500).json({
      message: "Error inside emptyCheck",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  emptyCheck,
};
