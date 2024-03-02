import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import playerReducer from "./slices/playerSlice";
import gameStateReducer from "./slices/gameStateSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    gameState: gameStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
