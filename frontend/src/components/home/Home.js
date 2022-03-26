import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserFeed } from "../../actions/userActions";
import Loading from "../loader/Loading.js";
import NoFeed from "./NoFeed.js";
import { useAlert } from "react-alert";

import Post from "../post/Post";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts, error } = useSelector((state) => state.userFeed);
  const { error: likesError, message } = useSelector((state) => state.likes);

  useEffect(() => {
    dispatch(getUserFeed());
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
    <>
      <Sidebar>
        {loading ? (
          <Loading />
        ) : (
          <div className="feeds">
            {posts &&
              (posts.length > 0 ? (
                posts.map((el) => {
                  return (
                    <Post
                      post={el}
                      key={el._id}
                      isHome={true}
                      isAccount={false}
                    />
                  );
                })
              ) : (
                <NoFeed />
              ))}
          </div>

          // <div className="feeds">
          //   {posts &&
          //     posts.map((el) => {
          //       return <Post post={el} key={el._id} />;
          //     })}
          // </div>
        )}
      </Sidebar>
    </>
  );
};

export default Home;
