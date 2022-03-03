var express = require("express");
var router = express.Router();
const {
  createUser,
  userLogin,
  updateProfile,
  getCurrentUser,
} = require("./controller/userController");
const {
  emptyCheck,
  valiDataCreate,
  valiDataLogin,
  jwtMiddleware,
} = require("./lib/authMiddleware/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get-current-user", jwtMiddleware, getCurrentUser);

router.post("/create-user", emptyCheck, valiDataCreate, createUser);

router.post("/login", emptyCheck, valiDataLogin, userLogin);

router.put("/update-profile", updateProfile);

module.exports = router;
