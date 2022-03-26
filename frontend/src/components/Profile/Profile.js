import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../loader/Loading";
import { loadUser, getMyPosts } from "../../actions/userActions";
import Post from "../post/Post";
import "./othersProfile.css";
import { useAlert } from "react-alert";
import { Typography, Dialog } from "@mui/material";

const Profile = () => {
  const alert = useAlert();
  const { loading, user, error } = useSelector((state) => state.user);
  const { error: likesError, message } = useSelector((state) => state.likes);
  const {
    posts,
    loading: myPostsLoading,
    error: mypostsError,
  } = useSelector((state) => state.myPosts);

  const dispatch = useDispatch();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (likesError) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, message, error, likesError, dispatch]);

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
                  <button className="btn btn-primary">
                    <Link to="/update/profile">UpdateProfile</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="userBio">
              <b>{user.name}</b>
            </div>
            {/* <div className="userBio">
              <b>Bio</b>
              <p>{(user && user.bio) || "no bio yet"}</p>
            </div> */}
          </div>

          <div className="userFeed">
            <div className="feeds">
              {myPostsLoading ? (
                <Loading />
              ) : (
                posts &&
                (posts.length > 0 ? (
                  posts.map((post, index) => {
                    return (
                      <Post post={post} isAccount={true} isDelete={true} />
                    );
                  })
                ) : (
                  <div className="noPosts">
                    no posts created
                    <p>
                      create your first <Link to="/createpost">post</Link>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default Profile;
