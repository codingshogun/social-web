import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../loader/Loading";
import {
  loadUser,
  getMyPosts,
  getOthersPosts,
  getOthersProfile,
  followUnfollowAction,
} from "../../actions/userActions";
import Post from "../post/Post";
import "./othersProfile.css";
import { useAlert } from "react-alert";
import { Typography, Dialog } from "@mui/material";

const Profile = () => {
  const params = useParams();
  const alert = useAlert();
  const {
    loading: selfLoading,
    error: selfError,
    user: selfUser,
  } = useSelector((state) => state.user);
  const { loading, user, error } = useSelector((state) => state.otherProfile);
  const {
    posts,
    error: postError,
    loading: postLoading,
  } = useSelector((state) => state.otherPosts);
  const { message, error: likesError } = useSelector((state) => state.likes);

  const dispatch = useDispatch();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followUnfollowAction(params.id));
    dispatch(getOthersProfile(params.id));
    dispatch(loadUser());
  };

  useEffect(() => {
    dispatch(getOthersPosts(params.id));
    dispatch(getOthersProfile(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      user.followers.forEach((item) => {
        if (item._id.toString() === selfUser._id.toString()) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, selfUser._id, params.id]);

  useEffect(() => {
    if (postError) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (selfError) {
      alert.error(selfError);
      dispatch({ type: "clearErrors" });
    }

    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likesError) {
      alert.danger(likesError);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, postError, message, dispatch, likesError]);

  return (
    <Sidebar>
      {loading ? (
        <Loading />
      ) : (
        <div className="otherUserContainer">
          <div className="userInfo">
            <div className="top">
              <div className="profile-Picture2">
                <img src={user && user.pfp.url} alt="pfp" />
              </div>

              <div className="followInfo">
                <div className="followInfoTiles">
                  <div className="info">
                    <b>{user && user.posts.length}</b>
                    <span>posts</span>
                  </div>

                  <div
                    className="info"
                    onClick={() => setFollowersToggle(!followersToggle)}
                  >
                    <b>{user && user.followers.length}</b>
                    <span>followers</span>

                    <Dialog
                      open={followersToggle}
                      onClose={() => setFollowersToggle(!followersToggle)}
                    >
                      <div className="likeDialogBox">
                        <p className="text-bold">followers</p>
                        {user && user.followers.length > 0 ? (
                          user.followers.map((follower) => (
                            <div className="userCard" key={follower.name}>
                              <Link to={`/profile/${follower._id}`}>
                                <img src={follower.pfp.url} alt="pfp" />

                                <span>{follower.name}</span>
                              </Link>
                            </div>
                          ))
                        ) : (
                          <Typography>No followers</Typography>
                        )}
                      </div>
                    </Dialog>
                  </div>

                  <div
                    className="info"
                    onClick={() => setFollowingToggle(!followingToggle)}
                  >
                    <b>{user && user.followings.length}</b>
                    <span>following</span>

                    <Dialog
                      open={followingToggle}
                      onClose={() => setFollowingToggle(!followingToggle)}
                    >
                      <div className="likeDialogBox">
                        <p className="text-bold">following</p>
                        {user && user.followings.length > 0 ? (
                          user.followings.map((follower) => (
                            <div className="userCard" key={follower.name}>
                              <Link to={`/profile/${follower._id}`}>
                                <img src={follower.pfp.url} alt="pfp" />

                                <span>{follower.name}</span>
                              </Link>
                            </div>
                          ))
                        ) : (
                          <Typography>you dont follow anyone</Typography>
                        )}
                      </div>
                    </Dialog>
                  </div>
                </div>

                <div className="followBtn">
                  <button onClick={followHandler} className="btn btn-primary">
                    <p>{following ? "unfollow" : "follow"}</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="userBio">
              <b>{user && user.name}</b>
            </div>
            {/* <div className="userBio">
              <b>Bio</b>
              <p>{(user && user.bio) || "no bio yet"}</p>
            </div> */}
          </div>

          <div className="userFeed">
            <div className="feeds">
              {postLoading ? (
                <Loading />
              ) : (
                posts &&
                (posts.length > 0 ? (
                  posts.map((post, index) => {
                    return (
                      <Post
                        post={post}
                        isAccount={false}
                        isDelete={false}
                        isOtherProfile={true}
                      />
                    );
                  })
                ) : (
                  <div className="noPosts">No posts from this user</div>
                ))
              )}

              {/* {postLoading ? (
                <Loading />
              ) : (
                posts &&
                posts.map((post, index) => {
                  return (
                    <Post post={post} isAccount={false} isDelete={false} />
                  );
                })
              )} */}
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default Profile;

// import React, { useEffect } from "react";
// import Sidebar from "../sidebar/Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Loading from "../loader/Loading";
// import "./othersProfile.css";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import { useParams } from "react-router-dom";
// import { followAction, unFollowAction } from "../../actions/userActions";
// import { useAlert } from "react-alert";
// import Post from "../post/Post";

// const OthersProfile = ({ match }) => {
//     const [followersToggle, setFollowersToggle] = useState(false)
//   return (
//     <Sidebar>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="otherUserContainer">
//           <div className="userInfo">
//             <div className="top">
//               <div className="profile-Picture2">
//                 <img src={user && user.pfp.url} alt="pfp" />
//               </div>

//               <div className="followInfo">
//                 <div className="followInfoTiles">
//                   <div className="info">
//                     <b>{user && user.posts.length}</b>
//                     <span>posts</span>
//                   </div>

//                   <div className="info">
//                     <b>{user && user.followers.length}</b>
//                     <span>followers</span>
//                   </div>

//                   <div className="info">
//                     <b>{user && user.following.length}</b>
//                     <span>following</span>
//                   </div>
//                 </div>
//                 <div className="followBtn">
//                   <button className="btn btn-primary" onClick={followHandler}>
//                     follow
//                   </button>
//                 </div>
//                 {/* {isFollowing ? (
//                   <div className="followBtn">
//                     <button
//                       className="btn btn-primary"
//                       onClick={unFollowHandler}
//                     >
//                       unfollow
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="followBtn">
//                     <button className="btn btn-primary" onClick={followHandler}>
//                       follow
//                     </button>
//                   </div>
//                 )} */}
//               </div>
//             </div>

//             <div className="userBio">
//               <b>Bio</b>
//               <p>{(user && user.bio) || "no bio yet"}</p>
//             </div>
//           </div>

//           <div className="userFeed">
//             <div className="feeds">
//               {loading ? (
//                 <Loading />
//               ) : (
//                 user &&
//                 user.posts.map((post, index) => {
//                   return (
//                     <Post post={post} />

//                     // <div className="feed">
//                     //   <div className="head">
//                     //     <Link to={`/profile/${post.user._id}`}>
//                     //       <div className="user">
//                     //         <div className="profile-Picture">
//                     //           <img src={post.user.pfp.url}></img>
//                     //         </div>
//                     //         <div className="ingo">
//                     //           <h3>{post.user.name}</h3>
//                     //           <small>{post.createdAt || "just now"}</small>
//                     //         </div>
//                     //       </div>
//                     //     </Link>
//                     //   </div>
//                     //   <div className="photo">
//                     //     <img src={post.image.url} />
//                     //   </div>

//                     //   <div className="action-buttons">
//                     //     <div className="interaction-buttons">
//                     //       <span>
//                     //         <FavoriteBorderIcon />
//                     //       </span>
//                     //       <span>
//                     //         <ChatBubbleOutlineIcon />
//                     //       </span>
//                     //     </div>
//                     //   </div>

//                     //   {post.likes.length > 0 ? (
//                     //     <div className="liked-by">
//                     //       <span>
//                     //         <img src={post.likes[0].pfp.url} alt="profileimg" />
//                     //       </span>

//                     //       <p>
//                     //         liked by<b>{post.likes[0].name}</b>and
//                     //         <b>{post.likes.length}</b>
//                     //         people
//                     //       </p>
//                     //     </div>
//                     //   ) : (
//                     //     <div className="liked-by">
//                     //       <span>
//                     //         <img
//                     //           src="https://res.cloudinary.com/dnru88a90/image/upload/v1646948417/socialmedia/9b47a023caf29f113237d61170f34ad9_zztlbo.jpg"
//                     //           alt="profileimg"
//                     //         />
//                     //       </span>

//                     //       <p>
//                     //         liked by
//                     //         <b>0 </b>
//                     //         people
//                     //       </p>
//                     //     </div>
//                     //   )}

//                     //   <div className="caption">
//                     //     <p>
//                     //       <b>{post.user.username}</b>
//                     //       {post.caption && post.caption}
//                     //       <span className="hash-tag"> #lol</span>
//                     //     </p>
//                     //   </div>

//                     //   <div className="comments text-muted">
//                     //     view all {post.comments.length} comments
//                     //   </div>
//                     // </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </Sidebar>
//   );
// };

// export default OthersProfile;
