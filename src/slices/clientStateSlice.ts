import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHost: false,
  isQuestionMaster: false,
  isFakeArtist: false,
  isGameStarted: false,
};

const clientStateSlice = createSlice({
  name: "clientState",
  initialState,
  reducers: {
    setIsHost: (state, action) => {
      const { isHost } = action.payload;
      state.isHost = isHost;
    },
    setIsQuestionMaster: (state, action) => {
      const { isQuestionMaster } = action.payload;
      state.isQuestionMaster = isQuestionMaster;
    },
    setIsFakeArtist: (state, action) => {
      const { isFakeArtist } = action.payload;
      state.isFakeArtist = isFakeArtist;
    },
    setIsGameStarted: (state, action) => {
      const { isGameStarted } = action.payload;
      state.isGameStarted = isGameStarted;
    },
  },
});

export const { setIsHost, setIsQuestionMaster, setIsFakeArtist, setIsGameStarted } = clientStateSlice.actions;

export default clientStateSlice.reducer;
