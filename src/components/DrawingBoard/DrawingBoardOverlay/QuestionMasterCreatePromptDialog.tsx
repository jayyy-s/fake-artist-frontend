import { ChangeEvent, useState } from "react";
import { useUpdatePromptMutation } from "../../../slices/gamesApiSice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsPromptSet } from "../../../slices/gameStateSlice";
import useWebSocket from "react-use-websocket";

const WS_URL = import.meta.env.VITE_WS_URL!;

const QuestionMasterCreatePromptDialog = () => {
  const { sendJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });
  const dispatch = useDispatch();

  const { gameId } = useParams();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const handleCategoryInputChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleTitleInputChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const [updatePrompt] = useUpdatePromptMutation();

  const setPrompt = () => {
    updatePrompt({ prompt: { title, category }, gameId }).then(() => {
      dispatch(setIsPromptSet({ isPromptSet: true }));
      sendJsonMessage({ type: "setPrompt", data: { gameId } });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 px-5 bg-fake-white border rounded-md border-black">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleCategoryInputChange(e.target.value || "")
        }
        className="border border-black mb-4 py-2 px-4"
        placeholder="Category (ex. Animal)"
        required
      />
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleTitleInputChange(e.target.value || "")
        }
        className="border border-black mb-4 py-2 px-4"
        placeholder="Title (ex. Dog)"
        required
      />
      <div className="btn-fake-yellow" onClick={setPrompt}>
        Create Prompt
      </div>
    </div>
  );
};

export default QuestionMasterCreatePromptDialog;
