import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentArtist: null,
  questionMaster: null,
  canvasState: "",
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setCurrentArtist: (state, action) => {
      const { currentArtist } = action.payload;
      state.currentArtist = currentArtist;
    },
    setQuestionMaster: (state, action) => {
      const { questionMaster } = action.payload;
      state.questionMaster = questionMaster;
    },
    setCanvasState: (state, action) => {
      const { canvasState } = action.payload;
      state.canvasState = canvasState;
    },
  },
});

export const { setCurrentArtist, setQuestionMaster, setCanvasState } = gameStateSlice.actions;

export default gameStateSlice.reducer;
