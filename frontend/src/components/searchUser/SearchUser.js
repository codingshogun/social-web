import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "./searchUser.css";
import Loading from "../loader/Loading";

const SearchUser = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const [search, setSearch] = useState("");
  return (
    <Sidebar>
      <>
        <div className="allUsersContainer">
          <div className="searchContainer">
            <SearchIcon />
            <input type="search" onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="allUsers">
            {loading ? (
              <Loading />
            ) : (
              users &&
              users.map((user) => {
                if (user.name.includes(search)) {
                  return (
                    <div className="userCard" key={user.name}>
                      <Link to={`/profile/${user._id}`}>
                        <img src={user.pfp.url} alt="pfp" />

                        <span>{user.name}</span>
                      </Link>
                    </div>
                  );
                }
              })
            )}
          </div>
        </div>
      </>
    </Sidebar>
  );
};

export default SearchUser;
