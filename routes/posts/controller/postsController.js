const Post = require("../model/postsModel");
const User = require("../../users/model/User");
const Comment = require("../../comments/model/commentsModel");
const { errorHandler, emptyCheck } = require("../../utils/index");

const makePost = async (req, res, next) => {
  try {
    //decodedUser does NOT contain the id of the user, which is used with mongo
    //in our backend. foundUser is required to get the id of the user, and interact with
    //the profile to make/delete posts etc...
    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });

    console.log(decodedUser);
    console.log(foundUser);

    const { title, post } = req.body;

    console.log("Here are your ...", title, post);

    const newPost = new Post({
      title: title,
      post: post,
      owner: foundUser.id,
    });

    const savedPost = await newPost.save();

    foundUser.postHistory.push(savedPost.id);
    await foundUser.save();

    res
      .status(200)
      .json({ message: "Your new post has been saved.", payload: savedPost });
  } catch (error) {
    res.status(500).json({ message: "Error", error: errorHandler(error) });
  }
};

//this will get every post the exists in our database
//owner field not populating? I'm confused on how to use populate.
const getAllPosts = async (req, res, next) => {
  try {
    console.log("running getAllPosts");
    const foundAllPosts = await Post.find({})
      .populate("owner", "username")
      .populate("commentHistory", "comment");

    // res.status(200).json(foundAllPosts);

    res.render("index", { title: "Weblog", posts: foundAllPosts });

    //render a index.ejs page, pass in the foundAllPosts info as posts
    //in the index.ejs page, console log out the posts
    //for each, of the posts, and list them on the page
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });

    const foundPost = await Post.findById(postId);

    console.log(foundUser);
    console.log(foundPost);

    //jwtMiddleware will determine who the user is, that is attemtping to update the post.
    //if the current user is not the owner of the post, throw an error

    if (foundUser._id.toString() === foundPost.owner.toString()) {
      const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Post has been updated.", payload: updatedPost })
    } else {
      throw { message: "You do not have permission to update this post." };
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: errorHandler(error) });
  }
};

const deletePost = async (req, res, next) => {
  try {
    console.log("deletePost running")
    const { postId } = req.params;
    console.log("this is", postId);
    console.log(req.params.postId);
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });

    await foundUser.postHistory.pull(req.params.postId);
    await foundUser.save();

    res.status(200).json({ message: "Your post was deleted.", payload: deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

module.exports = {
  makePost,
  getAllPosts,
  updatePost,
  deletePost,
};
