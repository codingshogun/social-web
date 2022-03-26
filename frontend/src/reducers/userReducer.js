import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { isAuthenticated: false },
  {
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    LogoutUserRequest: (state) => {
      state.loading = true;
    },
    LogoutUserSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    LogoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const usereFeedReducer = createReducer(
  {},
  {
    userFeedRequest: (state) => {
      state.loading = true;
    },
    userFeedSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    userFeedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const allUsersReducer = createReducer(
  {},
  {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const othersProfileReducer = createReducer(
  {},
  {
    othersProfileRequest: (state) => {
      state.loading = true;
    },
    othersProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    othersProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const myPostReducer = createReducer(
  {},
  {
    myPostsRequest: (state) => {
      state.loading = true;
    },
    myPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const otherPostsReducer = createReducer(
  {},
  {
    otherPostsRequest: (state) => {
      state.loading = true;
    },
    otherPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    otherPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

// export const otherUserReducer = createReducer(
//   {},
//   {
//     otherUserRequest: (state) => {
//       state.loading = true;
//     },
//     otherUserSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     otherUserFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   }
// );
