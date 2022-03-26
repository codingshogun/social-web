const postModel = require("../models/postModel");
const catchAsync = require("../middleware/catchAsync");
const customError = require("../middleware/customError");
const userModel = require("../models/userModel");
const cloudinary = require("cloudinary");

//create post
exports.createPostController = catchAsync(async (req, res, next) => {
  if (!req.body.image) {
    return next(new customError("Image required", 404));
  }
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "socialmedia",
  });
  const post = await postModel.create({
    user: req.user._id,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    caption: req.body.caption,
  });
  const user = await userModel.findById(req.user._id);
  await user.posts.unshift(post._id);
  user.save();
  res.status(200).json({
    status: "success",
    post,
    message: "post created",
  });
});

//delete post
exports.deletePostController = catchAsync(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new customError("no post found", 404));
  }

  if (post.user.toString() !== req.user._id.toString()) {
    return next(new customError("invalid access", 404));
  }
  await cloudinary.v2.uploader.destroy(post.image.public_id);

  const user = await userModel.findById(req.user._id);
  await user.posts.pull(post._id);

  await post.remove();
  await user.save();
  res.status(200).json({
    status: "success",
    message: "post deleted",
  });
});

//like unlike post
exports.likePostController = catchAsync(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  let message = "";
  if (post.likes.includes(req.user._id)) {
    post.likes.pull(req.user._id);
    message = "post unliked";
  } else {
    post.likes.push(req.user._id);
    message = "post liked";
  }
  await post.save();
  res.status(200).json({
    status: "success",
    message: message,
  });
});

//update caption
exports.updateCaptionController = catchAsync(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new customError("No post found", 404));
  }
  if (post.user.toString() !== req.user._id.toString()) {
    return next(new customError("invalid access", 404));
  }
  post.caption = req.body.caption;
  await post.save();
  res.status(200).json({
    status: "success",
    message: "caption updated",
  });
});

//comment
exports.commentPostController = catchAsync(async (req, res, next) => {
  if (!req.body.comment) {
    return next(new customError("comment required", 404));
  }
  const post = await postModel.findById(req.params.id);
  var prevComment = false;
  var message = "";
  post.comments.map((el, index) => {
    if (el.user.toString() === req.user._id.toString()) {
      el.comment = req.body.comment;
      prevComment = true;
      message = "Comment updated";
    }
  });
  if (prevComment === false) {
    post.comments.push({
      comment: req.body.comment,
      user: req.user._id,
    });
    message = "Comment added";
  }
  await post.save();
  res.status(200).json({
    status: "success",
    message,
  });
});

//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.user.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
