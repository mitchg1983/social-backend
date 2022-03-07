var express = require("express");
var router = express.Router();
const {
  makePost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("./controller/postsController");
const { emptyCheck, errorHandler } = require("../utils/index");
const { jwtMiddleware } = require("../users/lib/authMiddleware/index")

router.get("/", function (req, res, next) {
  res.send("Hello from the postsRouter!");
});

router.post("/make-post", jwtMiddleware, makePost);

router.get("/get-all-posts", getAllPosts);

router.put("/update-post/:postId", jwtMiddleware, updatePost);

router.delete("/delete-post/:postId", jwtMiddleware, deletePost);

module.exports = router;
