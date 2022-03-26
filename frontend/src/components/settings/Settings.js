import React, { useState } from "react";
import { Dialog, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./settings.css";
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProfile, logoutUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const Settings = () => {
  const dispatch = useDispatch();
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { error, message, loading } = useSelector((state) => state.likes);
  const deleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(logoutUser());
  };
  return (
    <Sidebar>
      <div className="settingsContainer">
        <Link to="/update/profile">
          <EditIcon />
          update profile
        </Link>
        <Link to="/update/password">
          <LockOpenIcon />
          update password
        </Link>
        <Link to="" onClick={() => setDeleteToggle(!deleteToggle)}>
          <DeleteIcon />
          Delete Account
        </Link>

        <Link to="" onClick={() => dispatch(logoutUser())}>
          <LogoutIcon /> logout
        </Link>

        <Dialog
          className="deleteContainer"
          open={deleteToggle}
          onClose={() => setDeleteToggle(!deleteToggle)}
        >
          <div>
            <p>Are you sure you want to delete your profile?</p>
            <div className="deleteButtons">
              <Button
                onClick={deleteProfileHandler}
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "white",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => setDeleteToggle(!deleteToggle)}
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "white",
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </Sidebar>
  );
};

export default Settings;
