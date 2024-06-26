import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setIsPromptSet } from "../slices/gameStateSlice";
import { GameState } from "../types/sliceStateTypes";

const WS_URL = import.meta.env.VITE_WS_URL!;

const GameInformation = () => {
  const { lastJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const { questionMaster, currentArtist, fakeArtistGuess } = useSelector(
    (state: GameState) => state.gameState
  );

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "setPrompt":
          dispatch(setIsPromptSet({ isPromptSet: true }));
          if (!lastJsonMessage.data.category || !lastJsonMessage.data.title)
            return;
          setCategory(lastJsonMessage.data.category);
          setTitle(lastJsonMessage.data.title);
          break;
      }
    }
  }, [dispatch, lastJsonMessage]);

  return (
    <div className="border rounded-md border-black bg-fake-white items-center justify-center py-2 px-4 mb-2">
      <div className="flex space-x-2">
        <div>
          Question Master: {questionMaster ? questionMaster.username : ""}
        </div>
        <div>Current Artist: {currentArtist ? currentArtist.username : ""}</div>
      </div>
      <div className="flex space-x-2">
        <div>Category: {category}</div>
        <div>Title: {title}</div>
      </div>
      {fakeArtistGuess && <div>Fake Artist Guess: {fakeArtistGuess}</div>}
    </div>
  );
};

export default GameInformation;
