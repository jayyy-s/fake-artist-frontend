import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerUsername: (state, action) => {
      const { username } = action.payload;
      state.username = username;
      localStorage.setItem("username", username);
    },
    disconnectPlayer: (state /* , action */) => {
      state.username = null;
    },
  },
});

export const { setPlayerUsername, disconnectPlayer } = playerSlice.actions;

export default playerSlice.reducer;
