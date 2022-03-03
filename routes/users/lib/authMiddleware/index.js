const { valiDataCreate } = require("./valiDataCreate");
const { valiDataLogin } = require("./valiDataLogin");
const { jwtMiddleware } = require("./jwtMiddleware");
const { valiDataUpdate } = require("./valiDataUpdate");

//MIDDLEWARE function index

module.exports = {
  valiDataCreate,
  valiDataLogin,
  jwtMiddleware,
  valiDataUpdate,
};
