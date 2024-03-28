import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { GameState } from "../../../types/sliceStateTypes";
import { useParams } from "react-router-dom";

const WS_URL = import.meta.env.VITE_WS_URL!;

const QuestionMasterTitleCheckDialog = () => {
  const { sendJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const { gameId } = useParams();

  const { fakeArtistGuess } = useSelector(
    (state: GameState) => state.gameState
  );

  const guessDecision = (decision: string) => {
    sendJsonMessage({
      type: "questionMasterDecision",
      data: { gameId, decision },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 px-5 bg-fake-white border rounded-md border-black">
      <div className="mb-4">The fake artist guessed {fakeArtistGuess}</div>
      <div className="py-2 px-4">Did they get it right?</div>
      <div className="flex space-x-6">
        <div
          className="btn-fake-yellow"
          onClick={() => guessDecision("correct")}
        >
          Yes
        </div>
        <div
          className="btn-fake-yellow"
          onClick={() => guessDecision("incorrect")}
        >
          No
        </div>
      </div>
    </div>
  );
};

export default QuestionMasterTitleCheckDialog;
