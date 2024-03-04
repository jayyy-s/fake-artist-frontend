import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import playerReducer from "./slices/playerSlice";
import gameStateReducer from "./slices/gameStateSlice";
import clientStateReducer from "./slices/clientStateSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    gameState: gameStateReducer,
    clientState: clientStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
