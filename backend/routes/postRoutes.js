const express = require("express");
const {
  createPostController,
  likePostController,
  deletePostController,
  updateCaptionController,
  commentPostController,
  deleteComment,
} = require("../controllers/postController");
const isLoggedIn = require("../middleware/auth");
const router = express.Router();

//create
router.post("/create", isLoggedIn, createPostController);

//delete
router.delete("/:id/delete", isLoggedIn, deletePostController);

//like
router.post("/:id/liul", isLoggedIn, likePostController);

//update caption
router.post("/:id/updatecaption", isLoggedIn, updateCaptionController);

//comment
router.post("/:id/comment", isLoggedIn, commentPostController);

//delete comment
router.delete("/:id/comment", isLoggedIn, deleteComment);

module.exports = router;
