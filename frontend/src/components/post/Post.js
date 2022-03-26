import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite, Delete } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  likeUnlikeAction,
  addCommentAction,
  deleteCommentAction,
  updatePostAction,
  deletePostAction,
} from "../../actions/postActions";
import Loading from "../loader/Loading";
import {
  getUserFeed,
  getMyPosts,
  loadUser,
  getOthersPosts,
} from "../../actions/userActions";
import { Dialog, Typography } from "@mui/material";

const Post = ({ post, isAccount, isDelete, isHome, isOtherProfile }) => {
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(post.caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const likeUnlikeHandler = async () => {
    setLiked(!liked);
    await dispatch(likeUnlikeAction(post._id));
    if (isAccount) {
      dispatch(getMyPosts());
    }
    if (isHome) {
      dispatch(getUserFeed());
    }
    if (isOtherProfile) {
      dispatch(getOthersPosts(params.id));
    }
    // else {
    //   dispatch(getOthersPosts(params.id));
    // }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentAction(post._id, commentValue));
    if (isAccount) {
      dispatch(getMyPosts());
    }
    if (isHome) {
      dispatch(getUserFeed());
    }
    if (isOtherProfile) {
      dispatch(getOthersPosts(params.id));
    }
    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    //   dispatch(getOthersPosts(params.id));
    // }
  };

  const deleteCommentHandler = async (commentId) => {
    await dispatch(deleteCommentAction(post._id, commentId));
    if (isAccount) {
      dispatch(getMyPosts());
    }
    if (isHome) {
      dispatch(getUserFeed());
    }
    if (isOtherProfile) {
      dispatch(getOthersPosts(params.id));
    }
    // if (isAccount) {
    //   dispatch(getMyPosts());
    // } else {
    //   dispatch(getOthersPosts(params.id));
    // }
  };

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePostAction(captionValue, post._id));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePostAction(post._id));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    post.likes.forEach((item) => {
      if (item._id.toString() === user._id.toString()) {
        setLiked(true);
      }
    });
  }, [post.likes, user._id]);

  return (
    <>
      {
        <div className="feed">
          <div className="head">
            <Link to={`/profile/${post.user._id}`}>
              <div className="user">
                <div className="profile-Picture">
                  <img src={post.user.pfp.url}></img>
                </div>
                <div className="ingo">
                  <h3>{post.user.name}</h3>
                  {/* <small>{post.createdAt.toDateString() || "just now"}</small> */}
                </div>
              </div>
            </Link>
            {isAccount && (
              <MoreVertOutlinedIcon
                onClick={() => setCaptionToggle(!captionToggle)}
              />
            )}
          </div>
          <div className="photo">
            <img src={post.image.url} />
          </div>

          <div className="action-buttons">
            <div className="interaction-buttons">
              <span onClick={likeUnlikeHandler}>
                {liked ? (
                  <Favorite style={{ color: "hsl(252, 75%, 60%)" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </span>
              <span onClick={() => setCommentToggle(!commentToggle)}>
                <ChatBubbleOutlineIcon />
              </span>
              {isAccount && (
                <span>
                  <DeleteOutlineIcon onClick={deletePostHandler} />
                </span>
              )}
            </div>
          </div>

          {post.likes.length > 0 ? (
            <div className="liked-by">
              <span>
                <img src={post.likes[0].pfp.url} alt="profileimg" />
              </span>

              <p onClick={() => setLikesUser(!likesUser)}>
                liked by<b>{post.likes[0].name}</b>and
                <b>{post.likes.length - 1 === 0 ? 0 : post.likes.length - 1}</b>
                people
              </p>
            </div>
          ) : (
            <div className="liked-by">
              <span>
                <img
                  src="https://res.cloudinary.com/dnru88a90/image/upload/v1646948417/socialmedia/9b47a023caf29f113237d61170f34ad9_zztlbo.jpg"
                  alt="profileimg"
                />
              </span>

              <p>
                liked by
                <b>0 </b>
                people
              </p>
            </div>
          )}

          <div className="caption">
            <p>
              <b>{post.user.name}</b>
              {post.caption && post.caption}
              <span className="hash-tag"> </span>
            </p>
          </div>

          <div
            className="comments text-muted"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            view all {post.comments.length} comments
          </div>

          <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
            <div className="likeDialogBox">
              <p className="text-bold">Liked by</p>
              {post.likes.map((user) => {
                return (
                  <div className="userCard" key={user.name}>
                    <Link to={`/profile/${user._id}`}>
                      <img src={user.pfp.url} alt="pfp" />

                      <span>{user.name}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Dialog>

          <Dialog
            open={commentToggle}
            onClose={() => setCommentToggle(!commentToggle)}
          >
            <div className="likeDialogBox">
              <p className="text-bold">Comments</p>

              <form className="commentForm" onSubmit={addCommentHandler}>
                <input
                  type="text"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="add a comment"
                  required
                />

                <button type="submit">comment</button>

                {post.comments.length > 0 ? (
                  post.comments.map((comment) => {
                    return (
                      <>
                        <div className="userCard" key={comment.user._id}>
                          <Link to={`/profile/${comment.user._id}`}>
                            <img src={comment.user.pfp.url} alt="pfp" />

                            <span>{comment.user.name} </span>
                          </Link>
                          <p className="txt-bold">{comment.comment}</p>
                          {isAccount ? (
                            <Delete
                              onClick={() => {
                                deleteCommentHandler(comment._id);
                              }}
                            />
                          ) : comment.user._id.toString() ===
                            user._id.toString() ? (
                            <Delete
                              onClick={() => {
                                deleteCommentHandler(comment._id);
                              }}
                            />
                          ) : null}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <Typography>No comments yet</Typography>
                )}
              </form>
            </div>
          </Dialog>

          <Dialog
            open={captionToggle}
            onClose={() => setCaptionToggle(!setCaptionToggle)}
          >
            <div className="likeDialogBox">
              <p className="text-bold">update caption</p>

              <form className="commentForm" onSubmit={updateCaptionHandler}>
                <input
                  type="text"
                  value={captionValue}
                  onChange={(e) => setCaptionValue(e.target.value)}
                  placeholder="add a comment"
                  required
                />

                <button type="submit">update </button>
              </form>
            </div>
          </Dialog>
        </div>
      }
    </>
  );
};

export default Post;
