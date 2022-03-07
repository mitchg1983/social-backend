var express = require("express");
var router = express.Router();

const {
  makeComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("./controller/commentsController");

const { emptyCheck, errorHandler } = require("../utils/index");
const { jwtMiddleware } = require("../users/lib/authMiddleware/index");

router.get("/", function (req, res, next) {
  res.send("Hello from the commentsRouter!");
});

router.post("/make-comment", jwtMiddleware, emptyCheck, makeComment);

router.get("/get-all-comments", jwtMiddleware, getAllComments);

router.put("/update-comment", jwtMiddleware, emptyCheck, updateComment);

router.delete("/delete-comment", jwtMiddleware, deleteComment);

module.exports = router;
