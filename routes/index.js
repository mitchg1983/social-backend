var express = require('express');
var router = express.Router();
const { getAllPosts } = require("./posts/controller/postsController")

const array = [1, 2, 3, 4, 5]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Weblog', data: array });
});

router.get("/show-all-posts", getAllPosts);

module.exports = router;
