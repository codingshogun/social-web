import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { updatePassword } from "../../actions/userActions";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  //   const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const { error, loading, message } = useSelector((state) => state.likes);
  const alert = useAlert();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
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
    <Sidebar>
      <div className="loginCenter">
        <h1>update password</h1>
        <form method="post" onSubmit={submitHandler}>
          <div className="loginTxtField">
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span></span>
            <label>old password</label>
          </div>

          <div className="loginTxtField">
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span></span>
            <label>new password</label>
          </div>

          <input
            type="submit"
            className="loginRegisterSubmit"
            disabled={loading}
          />
          <div className="loginSignupLink"></div>
        </form>
      </div>
    </Sidebar>
  );
};

export default UpdatePassword;
