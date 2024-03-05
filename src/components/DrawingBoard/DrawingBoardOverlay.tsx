import { ChangeEvent, useEffect, useState } from "react";
import { useUpdatePromptMutation } from "../../slices/gamesApiSice";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsPromptSet } from "../../slices/gameStateSlice";

const WS_URL = import.meta.env.VITE_WS_URL!;

const DrawingBoardOverlay = () => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketData>(
    WS_URL,
    {
      share: true,
    }
  );

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { gameId } = useParams();

  const { isGameStarted, isHost, isQuestionMaster } = useSelector(
    (state: ClientState) => state.clientState
  );

  const startGameHandler = () => {
    sendJsonMessage({ type: "hostStartGame", data: { gameId } });
  };

  const handleCategoryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [updatePrompt] = useUpdatePromptMutation();
  const { isPromptSet } = useSelector((state: GameState) => state.gameState);
  const setPrompt = () => {
    updatePrompt({ prompt: { title, category }, gameId }).then(() => {
      dispatch(setIsPromptSet({ isPromptSet: true }));
      sendJsonMessage({ type: "setPrompt", data: { gameId } });
    });
  };

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "notEnoughPlayers":
          setErrorMessage("Need at least 4 players to start");
          break;
      }
    }
  }, [lastJsonMessage]);

  return (
    <div className="flex items-center justify-center absolute w-full h-full inset-0 bg-black bg-opacity-20">
      {isHost && !isGameStarted && (
        <div className="flex flex-col items-center justify-center relative w-72 h-36 bg-slate-50 border rounded-md border-black">
          <div onClick={startGameHandler} className="btn-fake-yellow">
            Start Game
          </div>
          {errorMessage && <span className="text-red-600 absolute bottom-3">{errorMessage}</span>}
        </div>
      )}
      {isQuestionMaster && isGameStarted && !isPromptSet && (
        <div className="flex flex-col items-center justify-center py-5 px-5 bg-slate-50 border rounded-md border-black">
          <input
            onChange={handleCategoryInputChange}
            className="border border-black mb-4 py-2 px-4"
            placeholder="Category (ex. Animal)"
            required
          />
          <input
            onChange={handleTitleInputChange}
            className="border border-black mb-4 py-2 px-4"
            placeholder="Title (ex. Dog)"
            required
          />
          <div className="btn-fake-yellow" onClick={setPrompt}>
            Create Prompt
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingBoardOverlay;
