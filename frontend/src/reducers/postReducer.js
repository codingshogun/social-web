import { createReducer } from "@reduxjs/toolkit";

export const likeUnlikeReducer = createReducer(
  {},
  {
    likeRequest: (state, action) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostRequest: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostRequest: (state) => {
      state.loading = true;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProfileRequest: (state) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    followUnfollowRequest: (state) => {
      state.loading = true;
    },
    followUnfollowSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUnfollowFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
