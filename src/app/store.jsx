import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('user', JSON.stringify(state.user));
});

export default store;