import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/userActions";
import { useAlert } from "react-alert";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [password, setPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setPfp(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name, pfp));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <>
      <div className="registerCenter">
        <h1>register</h1>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <Avatar
            src={pfp}
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

          <div className="registerTxtField">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>password</label>
          </div>

          <div className="registerFileField">
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <span></span>
          </div>

          <div className="registerPass">forgot password?</div>
          <input
            type="submit"
            className="loginRegisterSubmit"
            disabled={loading}
          />
          <div className="registerSignupLink">
            login instead
            <Link to="/login">login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
