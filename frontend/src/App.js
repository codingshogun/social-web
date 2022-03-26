import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/loginregister/Login";
import Register from "./components/loginregister/Register.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import { useEffect } from "react";
import Home from "./components/home/Home";
import Messages from "./components/messages/Messages";
import SearchUser from "./components/searchUser/SearchUser";
import Settings from "./components/settings/Settings";
import Profile from "./components/Profile/Profile";
import OthersProfile from "./components/Profile/OthersProfile.js";
import CreatePost from "./components/createPost/CreatePost";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import NotFound from "./components/notfound/NotFound.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />

          <Route
            path="/login"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Home /> : <Register />}
          />
          <Route
            path="/searchuser"
            element={isAuthenticated ? <SearchUser /> : <Login />}
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />

          <Route
            path="/createpost"
            element={isAuthenticated ? <CreatePost /> : <Login />}
          />

          <Route
            path="/update/profile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />

          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Login />}
          />

          <Route
            path="/update/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />

          <Route
            path="/forgot/password"
            element={isAuthenticated ? <Home /> : <ForgotPassword />}
          />

          <Route
            path="/password/reset/:token"
            element={isAuthenticated ? <Home /> : <ResetPassword />}
          />

          <Route
            path="/profile/:id"
            element={isAuthenticated ? <OthersProfile /> : <Login />}
          />

          <Route path="*" element={<NotFound />} />

          {/* 

          <Route
            path="/messages"
            element={isAuthenticated ? <Messages /> : <Login />}
          />

          

          
          

           */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
