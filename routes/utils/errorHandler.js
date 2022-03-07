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
