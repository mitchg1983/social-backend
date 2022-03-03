//make a function that takes in our errors coming in from our userController
//mix of mongodb error and other errors in our controller
//in users: only used in the create and update

const parsedError = (err) => {
  let objectKeys = Object.keys(err.keyValue);
  let objectValues = Object.values(err.keyValue);
  return `${objectKeys[0]} ${objectValues[0]} is already in use`;
};

const errorHandler = (err) => {
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
        message = parsedError(err);
        break;
      default:
        message = "errorHandler error, something is wrong! Get help!!";
    }
  }
  return message;
};

module.exports = {
  errorHandler,
};
