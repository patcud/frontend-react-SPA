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
      console.log('State newData:', newData)
      console.log('State newData.id:', newData.id)
      const index = state.findIndex((user) => {user.id == newData.id});
      console.log('Index: ', index)
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