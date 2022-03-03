const { emptyCheck } = require("./emptyCheck")
const { valiDataCreate } = require("./valiDataCreate")
const { valiDataLogin } = require("./valiDataLogin")

//MIDDLEWARE function index

module.exports = {
    emptyCheck,
    valiDataCreate,
    valiDataLogin
}