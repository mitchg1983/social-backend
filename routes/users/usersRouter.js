var express = require("express");
var router = express.Router();
const {
  createUser,
  userLogin,
  updateProfile,
  getCurrentUser,
} = require("./controller/userController");
const {
  valiDataCreate,
  valiDataLogin,
  valiDataUpdate,
  jwtMiddleware,
} = require("./lib/authMiddleware/index");
const { emptyCheck } = require("./utils/emptyCheck");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get-current-user", jwtMiddleware, getCurrentUser);

router.post("/create-user", emptyCheck, valiDataCreate, createUser);

router.post("/login", emptyCheck, valiDataLogin, userLogin);

router.put("/update-profile", jwtMiddleware, emptyCheck, valiDataUpdate, updateProfile);

module.exports = router;
