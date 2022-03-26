import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (email, password, name, pfp) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        "/api/users/Register",
        { email, password, pfp, name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateUser = (name, email, pfp) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    const { data } = await axios.put(
      "/api/users/profile",
      { email, pfp, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const { data } = await axios.put(
        "/api/users/profile/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updatePasswordSuccess",
        payload: "password updated",
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });
    const { data } = await axios.delete("/api/users/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });
    const { data } = await axios.post(
      "/api/users/profile/password/forgot",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });
    const { data } = await axios.put(
      `/api/users/profile/password/reset/${token}`,
      {
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "resetPasswordSuccess",
      payload: "password updated",
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/users/profile");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });
    const { data } = await axios.post("/api/users/logout");
    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: "userFeedRequest",
    });

    const { data } = await axios.get("/api/users/profile/feed");
    dispatch({
      type: "userFeedSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userFeedFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });
    const { data } = await axios.get("/api/users/profiles");
    dispatch({
      type: "allUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};

// export const getOtherUser = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "otherUserRequest",
//     });
//     const { data } = await axios.get(`/api/users/profile/${id}`);
//     dispatch({
//       type: "otherUserSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "otherUserFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

export const followAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followRequest",
    });
    const { data } = await axios.post(`/api/users/profile/${id}/follow`);
    dispatch({
      type: "followSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followFailure",
      payload: error.response.data.message,
    });
  }
};

export const unFollowAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "unFollowRequest",
    });
    const { data } = await axios.post(`/api/users/profile/${id}/unfollow`);
    dispatch({
      type: "unFollowSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "unFollowFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get(`/api/users/profile/posts`);
    console.log(data);
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getOthersPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "otherPostsRequest",
    });

    const { data } = await axios.get(`/api/users/profile/${id}/posts`);

    dispatch({
      type: "otherPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "otherPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getOthersProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "othersProfileRequest",
    });

    const { data } = await axios.get(`/api/users/profile/${id}`);

    dispatch({
      type: "othersProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "othersProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followUnfollowAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUnfollowRequest",
    });

    const { data } = await axios.post(`/api/users/followunfollow/${id}`);

    dispatch({
      type: "followUnfollowSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "followUnfollowFailure",
      payload: error.response.data.message,
    });
  }
};
