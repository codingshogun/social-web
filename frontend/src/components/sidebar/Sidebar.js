import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = (props, { history, location }) => {
  const [active, setActive] = useState(window.location.pathname);
  const { loading, error, user } = useSelector((state) => state.user);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <>
      {!loading && (
        <main>
          <div className="container">
            <div
              className="sidebarMenuBtn"
              onClick={() => {
                setSidebarToggle(!sidebarToggle);
              }}
            >
              <MenuIcon />
            </div>
            <div className={sidebarToggle ? "left" : "left dontShow"}>
              <Link to="/profile" className="profile">
                <div className="profile-Picture">
                  <img src={user && user.pfp.url} />
                </div>

                <div className="handle">
                  <h4>{user && user.name}</h4>
                </div>
              </Link>

              <div className="sidebar">
                <Link
                  to="/"
                  className={active === "/" ? "menu-item active" : "menu-item"}
                >
                  <span>
                    <HomeIcon />
                  </span>
                  <h3>Home</h3>
                </Link>

                <Link
                  to="/createpost"
                  className={
                    active === "/createpost" ? "menu-item active" : "menu-item"
                  }
                >
                  <span>
                    <AddAPhotoIcon />
                  </span>
                  <h3>create post</h3>
                </Link>

                <Link
                  to="/searchuser"
                  className={
                    active === "/searchuser" ? "menu-item active" : "menu-item"
                  }
                >
                  <span>
                    <PersonSearchIcon />
                  </span>
                  <h3>search users</h3>
                </Link>
                <Link
                  to="/messages"
                  className={
                    active === "/messages" ? "menu-item active" : "menu-item"
                  }
                >
                  <span>
                    <ForumIcon />
                  </span>
                  <h3>messages</h3>
                </Link>
                <Link
                  to="/settings"
                  className={
                    active === "/settings" ? "menu-item active" : "menu-item"
                  }
                >
                  <span>
                    <SettingsIcon />
                  </span>
                  <h3>settings</h3>
                </Link>
              </div>

              {/* <Link to="/createpost">
              <label className="btn btn-primary">create post</label>
            </Link> */}
            </div>

            <div className="middle">{props.children}</div>
          </div>
        </main>
      )}
    </>
  );
};

export default Sidebar;
