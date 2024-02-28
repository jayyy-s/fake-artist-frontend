import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GamePage from "./pages/GamePage";
import StartGamePage from "./pages/StartGamePage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./store.ts";
import { Provider } from "react-redux";
import JoinGamePage from "./pages/JoinGamePage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<StartGamePage />} />
      <Route path="/game/:gameId" element={<GamePage />} />
      <Route path="/join/:gameId" element={<JoinGamePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
