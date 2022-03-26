import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./forgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, loginUser } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Sidebar from "../sidebar/Sidebar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.likes);
  const alert = useAlert();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
  }, [dispatch, error, alert, message]);

  return (
    <div className="loginCenter">
      <h1>password recovery</h1>
      <form method="post" onSubmit={submitHandler}>
        <div className="loginTxtField">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
          <label>email</label>
        </div>

        <input type="submit" className="loginRegisterSubmit" />
        <div className="loginSignupLink">
          login instead
          <Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
