import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentArtist: null,
  questionMaster: null,
  isPromptSet: false,
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
    setIsPromptSet: (state, action) => {
      const { isPromptSet } = action.payload;
      state.isPromptSet = isPromptSet;
    },
  },
});

export const {
  setCurrentArtist,
  setQuestionMaster,
  setCanvasState,
  setIsPromptSet,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
