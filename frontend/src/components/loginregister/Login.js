import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userActions";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.likes);
  const alert = useAlert();
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
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
    <>
      <div className="loginCenter">
        <h1>Login</h1>
        <form method="post" onSubmit={loginHandler}>
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

          <div className="loginTxtField">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>password</label>
          </div>

          <div className="loginPass">
            <Link to="/forgot/password">forgot password?</Link>
          </div>
          <input type="submit" className="loginRegisterSubmit" />
          <div className="loginSignupLink">
            create a account
            <Link to="/register">signup</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
