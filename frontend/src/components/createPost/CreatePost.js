import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./createpost.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createPostAction } from "../../actions/postActions";
import { loadUser, getMyPosts } from "../../actions/userActions";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.likes);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createPostAction(caption, image));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);
  return (
    <Sidebar>
      <div className="newPost">
        <form className="newPostForm" onSubmit={submitHandler}>
          <p>New Post</p>

          {image && <img src={image} alt="post" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            placeholder="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="btn btn-primary" disabled={loading} type="submit">
            Post
          </button>
        </form>
      </div>
    </Sidebar>
  );
};

export default CreatePost;
