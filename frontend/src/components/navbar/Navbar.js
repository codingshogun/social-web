import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("logged out");
  };
  return (
    <>
      <nav>
        <div className="container">
          <h2 className="navLogo">
            <Link to="/">Social Web</Link>
          </h2>

          <div className="navCreate">
            {isAuthenticated && (
              <Link to="/profile">
                <div className="profile-Picture">
                  <img src={user.pfp.url} />
                </div>
              </Link>
            )}
            {isAuthenticated ? (
              <label className="btn btn-primary" onClick={logoutHandler}>
                logout
              </label>
            ) : (
              <Link to="/login">
                <label className="btn btn-primary">login</label>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
