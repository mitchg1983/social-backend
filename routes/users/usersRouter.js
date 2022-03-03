var express = require("express");
var router = express.Router();
const { createUser, userLogin } = require("./controller/userController");
const { emptyCheck, valiDataCreate, valiDataLogin } = require("./lib/authMiddleware/index")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", emptyCheck, valiDataCreate, createUser);

router.post("/login", emptyCheck, valiDataLogin, userLogin)

module.exports = router;
