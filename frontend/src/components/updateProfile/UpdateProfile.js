import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./UpdateProfile.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createPostAction } from "../../actions/postActions";
import { Avatar } from "@mui/material";
import { loadUser, updateUser } from "../../actions/userActions";
import Loader from "../../components/loader/Loading";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.likes);
  const alert = useAlert();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pfp, setPfp] = useState("");
  const [pfpPreview, setPfpPreview] = useState(user.pfp.url);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPfpPreview(Reader.result);
        setPfp(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(name, email, pfp));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);
  return (
    <Sidebar>
      {loading ? (
        <Loader />
      ) : (
        <div className="registerCenter forUpdate">
          <h1>update profile</h1>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <Avatar
              src={pfpPreview}
              alt="userImg"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
            <div className="registerTxtField">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span></span>
              <label>name</label>
            </div>

            <div className="registerTxtField">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <label>email</label>
            </div>

            {/* <div className="registerTxtField">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span></span>
                <label>password</label>
              </div> */}

            <div className="registerFileField">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <span></span>
            </div>

            <input
              type="submit"
              className="loginRegisterSubmit"
              disabled={updateLoading}
            />
          </form>
        </div>
      )}
    </Sidebar>
  );
};

export default UpdateProfile;
