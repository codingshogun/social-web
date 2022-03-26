const sendToken = require("../utils/sendToken.js");
const catchAsync = require("../middleware/catchAsync.js");
const customError = require("../middleware/customError");
const userModel = require("../models/userModel.js");
const postModel = require("../models/postModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
const { post } = require("../routes/userRoutes.js");

//register
exports.registerController = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return next(new customError("all fields are required", 404));
  }
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return next(new customError("user with that email already exist", 404));
  }
  const myCloud = await cloudinary.v2.uploader.upload(req.body.pfp, {
    folder: "socialmedia",
  });
  user = await userModel.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    bio: req.body.bio,
    pfp: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 200, res);
});

//login
exports.loginController = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return next(new customError("all fields are required", 404));
  }
  const user = await userModel
    .findOne({ email: req.body.email })
    .populate("posts followers followings")
    .select("+password");
  if (!user) {
    return next(new customError("wrong email or password", 404));
  }
  const isCorrectPassword = await user.comparePassword(req.body.password);
  if (!isCorrectPassword) {
    return next(new customError("wrong email or password", 404));
  }
  sendToken(user, 200, res);
});

//logout
exports.logoutController = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//follow
exports.followUnfollowController = catchAsync(async (req, res, next) => {
  if (req.user._id.toString() !== req.params.id.toString()) {
    const userToFollow = await userModel.findById(req.params.id);
    const user = await userModel.findById(req.user._id);
    if (!userToFollow.followers.includes(req.user._id)) {
      userToFollow.followers.push(req.user._id);
      user.followings.push(userToFollow._id);
      await user.save();
      await userToFollow.save();
      return res.status(200).json({
        status: "success",
        message: "user followed",
      });
    }

    if (userToFollow.followers.includes(req.user._id)) {
      userToFollow.followers.pull(req.user._id);
      user.followings.pull(userToFollow._id);
      await user.save();
      await userToFollow.save();
      return res.status(200).json({
        status: "success",
        message: "user unfollowed",
      });
    }
  }

  res.status(200).json({
    status: "success",
    message: "cant follow self",
  });
});

//user feed
exports.getUserFeedController = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const friendsPost = await postModel
    .find({
      user: {
        $in: user.followings,
      },
    })
    .populate("likes", "username name _id pfp")
    .populate("comments.user", "username name _id pfp")
    .populate("user", "username name pfp _id");

  res.status(200).json({
    status: "success",
    posts: friendsPost.reverse(),
  });
});

//update password
exports.updatePasswordController = catchAsync(async (req, res, next) => {
  if (!req.body.oldPassword || !req.body.newPassword) {
    return next(new customError("all fields are required", 404));
  }
  const user = await userModel.findById(req.user._id).select("+password");
  const isOldPasswordCorrect = await user.comparePassword(req.body.oldPassword);
  if (!isOldPasswordCorrect) {
    return next(new customError("incorrect password", 404));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update profile
exports.updateProfileController = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      email: req.body.email,
      bio: req.body.bio,
      name: req.body.name,
    },
    { new: true }
  );
  if (req.body.pfp) {
    await cloudinary.v2.uploader.destroy(user.pfp.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.pfp, {
      folder: "socialmedia",
    });
    user.pfp.public_id = myCloud.public_id;
    user.pfp.url = myCloud.secure_url;
    await user.save();
  }
  res.status(200).json({
    status: "success",
    message: "profile updated",
  });
});

//delete profile
exports.deleteProfileController = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  await cloudinary.v2.uploader.destroy(user.pfp.public_id);

  user.posts.forEach(async (el) => {
    const post = await postModel.findById(el);
    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.remove();
  });
  user.followers.forEach(async (el) => {
    const userr = await userModel.findById(el);
    userr.followings.pull(user._id);
    await userr.save();
  });

  user.followings.forEach(async (el) => {
    const userrr = await userModel.findById(el);
    userrr.followers.pull(user._id);
    await userrr.save();
  });

  //comments
  const allPosts = await postModel.find();

  for (let i = 0; i < allPosts.length; i++) {
    const post = await postModel.findById(allPosts[i]._id);

    for (let j = 0; j < post.comments.length; j++) {
      if (post.comments[j].user.toString() === user._id.toString()) {
        post.comments.splice(j, 1);
      }
    }
    await post.save();
  }
  // removing all likes of the user from all posts

  for (let i = 0; i < allPosts.length; i++) {
    const post = await postModel.findById(allPosts[i]._id);

    for (let j = 0; j < post.likes.length; j++) {
      if (post.likes[j].toString() === user._id.toString()) {
        post.likes.splice(j, 1);
      }
    }
    await post.save();
  }

  await user.remove();
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "user deleted",
  });
});

//get user
exports.getUserController = catchAsync(async (req, res, next) => {
  const user = await userModel
    .findById(req.user._id)
    .populate("posts followers followings");
  res.status(200).json({
    status: "success",
    user,
  });
});

//get any user profile
exports.getAnyUserProfileController = catchAsync(async (req, res, next) => {
  const user = await userModel
    .findById(req.params.id)
    .populate("posts followers followings");
  if (!user) {
    return next(new customError("no user found", 404));
  }
  res.status(200).json({
    status: "success",
    user,
  });
});

//get all users
exports.getAllUsersController = catchAsync(async (req, res, next) => {
  const users = await userModel.find({
    name: {
      $regex: req.query.search || "",
      $options: "i",
    },
    _id: {
      $ne: req.user._id,
    },
  });
  res.status(200).json({
    status: "success",
    users,
  });
});

//forgot password
exports.forgotPasswordController = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new customError("no user found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save();
  try {
    await sendEmail({
      email: user.email,
      subject: `Password recovery`,
      message: `Click the link below to reset your password ${`${
        req.protocol
      }://${req.get("host")}/password/reset/${resetToken}`}`,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new customError(error.message, 404));
  }
});

//reset password
exports.resetPasswordController = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new customError("link expired", 404));
  }
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get self posts
exports.getSelfPostsController = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const posts = [];
  for (let i = 0; i < user.posts.length; i++) {
    const post = await postModel
      .findById(user.posts[i])
      .populate("likes comments.user user");
    posts.push(post);
  }
  res.status(200).json({
    success: true,
    posts,
  });
});

//other posts
exports.getOtherUserPostsController = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  const posts = [];
  for (let i = 0; i < user.posts.length; i++) {
    const post = await postModel
      .findById(user.posts[i])
      .populate("likes comments.user user");
    posts.push(post);
  }
  res.status(200).json({
    success: true,
    posts,
  });
});
