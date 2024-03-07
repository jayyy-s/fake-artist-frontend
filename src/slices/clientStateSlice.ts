import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHost: false,
  isQuestionMaster: false,
  isFakeArtist: false,
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
  },
});

export const { setIsHost, setIsQuestionMaster, setIsFakeArtist } = clientStateSlice.actions;

export default clientStateSlice.reducer;
