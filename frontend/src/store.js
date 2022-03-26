import { configureStore } from "@reduxjs/toolkit";
import { likeUnlikeReducer } from "./reducers/postReducer";
import {
  allUsersReducer,
  myPostReducer,
  otherPostsReducer,
  othersProfileReducer,
  usereFeedReducer,
  userReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    userFeed: usereFeedReducer,
    allUsers: allUsersReducer,
    likes: likeUnlikeReducer,
    myPosts: myPostReducer,
    otherProfile: othersProfileReducer,
    otherPosts: otherPostsReducer,
  },
});
export default store;
