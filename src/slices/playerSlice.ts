import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null,
  id: -1,
  colorCombo: null,
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
    connectPlayer: (state, action) => {
      const { colorCombo, id } = action.payload;
      state.colorCombo = colorCombo;
      state.id = id;
    },
    disconnectPlayer: (state /* , action */) => {
      state.username = null;
      state.colorCombo = null;
      state.id = -1;
    },
  },
});

export const { setPlayerUsername, connectPlayer, disconnectPlayer } =
  playerSlice.actions;

export default playerSlice.reducer;
