const Post = require("../../posts/model/postsModel");
const User = require("../../users/model/User");
const Comment = require("../../comments/model/commentsModel");
const { errorHandler, emptyCheck } = require("../../utils/index");

const makeComment = async (req, res, next) => {
  try {
    // res.send("makeComment is running.");

    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });

    const { comment, postId } = req.body;

    const newComment = new Comment({
      comment: comment,
      post: postId,
    });

    const savedComment = await newComment.save();
    foundUser.commentHistory.push(savedComment.id);

    const foundPost = await Post.findById(postId);
    foundPost.commentHistory.push(savedComment.id);
  } catch (error) {
    res.status(500).json({ message: "Error", error: errorHandler(error) });
  }
};

const getAllComments = async (req, res, next) => {
  try {
    // res.send("getAllComments is running.");

    const foundAllComments = await Comment.find({}).populate("post", "post");

    res.status(200).json({ foundAllComments });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

const updateComment = async (req, res, next) => {
  try {
    // res.send("updateComment is running.");

    const { commentId } = req.params;

    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });

    const foundComment = await Comment.findById(commentId);

    if (foundUser._id.toString() === foundComment.owner.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        req.body,
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ message: "Comment has been updated.", payload: updateComment });
    } else {
      throw { message: "You don't have permission to edit this comment." };
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: errorHandler(error) });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    // res.send("deleteComment is running.");

    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);
    const decodedUser = res.locals.decodedToken;
    const foundUser = await User.findOne({ email: decodedUser.email });
    const foundPost = await Post.findById({ id: deletedComment.post.id });

    await foundUser.commentHistory.pull(id);
    await foundUser.save();

    await foundPost.commentHistory.pull(id);
    await foundPost.save();
  } catch (error) {
    res.status(500).json({ message: "Error", error: error });
  }
};

module.exports = {
  makeComment,
  getAllComments,
  updateComment,
  deleteComment,
};
