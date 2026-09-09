import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import userReducer from "../counter/userSlice";
import potsReducer from "../counter/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    posts: potsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
