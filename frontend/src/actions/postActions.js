import axios from "axios";

export const likeUnlikeAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.post(`/api/posts/${id}/liul`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data,
    });
  }
};

export const addCommentAction = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });
    const { data } = await axios.post(
      `/api/posts/${id}/comment`,
      { comment },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data,
    });
  }
};

export const deleteCommentAction = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });
    const { data } = await axios.delete(`/api/posts/${id}/comment`, {
      data: { commentId },
    });
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data,
    });
  }
};

export const createPostAction = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "createPostRequest",
    });
    const { data } = await axios.post(
      `/api/posts/create`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "createPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "createPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePostAction = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePostRequest",
    });
    const { data } = await axios.post(
      `/api/posts/${id}/updatecaption`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updatePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePostAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });
    const { data } = await axios.delete(
      `/api/posts/${id}/delete`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
