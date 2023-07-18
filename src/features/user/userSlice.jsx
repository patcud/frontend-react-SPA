import { createSlice } from "@reduxjs/toolkit";

const persistedUser = JSON.parse(localStorage.getItem('user'));

export const userSlice = createSlice({
  name: "user",
  initialState: persistedUser || [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    removeUser: (state, action) => {
      const userIds = action.payload;
      return state.filter((user) => !userIds.includes(user.id));
    },
    editUser: (state, action) => {
      const newData = action.payload;
      const index = state.findIndex((user) => user.id == newData.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...newData }
      }
    },
    clearUser: (state) => {
      return [];
    }
  }
});

export const { addUser, removeUser, editUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;