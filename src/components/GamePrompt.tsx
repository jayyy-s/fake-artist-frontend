import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setIsPromptSet } from "../slices/gameStateSlice";

const WS_URL = import.meta.env.VITE_WS_URL!;

const GamePrompt = () => {
  const { lastJsonMessage } = useWebSocket<PromptWebSocketData>(WS_URL, {
    share: true,
  });

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "setPrompt":
          dispatch(setIsPromptSet({ isPromptSet: true }));
          setCategory(lastJsonMessage.data.category);
          setTitle(lastJsonMessage.data.title);
          break;
      }
    }
  }, [dispatch, lastJsonMessage]);

  return (
    <div className="border rounded-md border-black bg-slate-50 items-center justify-center py-2 px-4 mb-2 w-52">
      <div>Category: {category}</div>
      <div>Title: {title}</div>
    </div>
  );
};

export default GamePrompt;
