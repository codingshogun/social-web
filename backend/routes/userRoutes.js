const express = require("express");
const {
  registerController,
  loginController,
  followUnfollowController,
  getUserFeedController,
  logoutController,
  updatePasswordController,
  updateProfileController,
  deleteProfileController,
  getUserController,
  getAnyUserProfileController,
  getAllUsersController,
  forgotPasswordController,
  resetPasswordController,
  getSelfPostsController,
  getOtherUserPostsController,
} = require("../controllers/userController.js");
const isLoggedIn = require("../middleware/auth");

const router = express.Router();

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//logout
router.post("/logout", logoutController);

//update password
router.put("/profile/password", isLoggedIn, updatePasswordController);

//update profile
router.put("/profile", isLoggedIn, updateProfileController);

//follow
router.post("/followunfollow/:id", isLoggedIn, followUnfollowController);

//get user feed
router.get("/profile/feed", isLoggedIn, getUserFeedController);

//delete profile
router.delete("/profile", isLoggedIn, deleteProfileController);

//get user
router.get("/profile", isLoggedIn, getUserController);

//self posts
router.get("/profile/posts", isLoggedIn, getSelfPostsController);

//get any user profile
router.get("/profile/:id", isLoggedIn, getAnyUserProfileController);

//get any user posts
router.get("/profile/:id/posts", isLoggedIn, getOtherUserPostsController);

//get all users
router.get("/profiles", isLoggedIn, getAllUsersController);

//forgot password
router.post("/profile/password/forgot", forgotPasswordController);

//reset password
router.put("/profile/password/reset/:token", resetPasswordController);

module.exports = router;
