import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import {
  DrawingBoardVariant,
  drawingBoardVariants,
} from "../../../types/enums";
import StartGameDialog from "./StartGameDialog";
import QuestionMasterCreatePromptDialog from "./QuestionMasterCreatePromptDialog";
import FakeArtistGuessDialog from "./FakeArtistGuessDialog";
import QuestionMasterTitleCheckDialog from "./QuestionMasterTitleCheckDialog";
import ResultDialog from "./ResultDialog";

const WS_URL = import.meta.env.VITE_WS_URL!;

type DrawingBoardOverlayProps = {
  variant: DrawingBoardVariant;
};

const DrawingBoardOverlay = (props: DrawingBoardOverlayProps) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketData>(
    WS_URL,
    {
      share: true,
    }
  );

  const { gameId } = useParams();
  const { variant } = props;

  const [errorMessage, setErrorMessage] = useState("");

  const startGameHandler = () => {
    sendJsonMessage({ type: "hostStartGame", data: { gameId } });
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
      {variant === drawingBoardVariants.host && (
        <StartGameDialog
          startGameHandler={startGameHandler}
          errorMessage={errorMessage}
        />
      )}
      {variant === drawingBoardVariants.questionMaster && (
        <QuestionMasterCreatePromptDialog />
      )}
      {variant === drawingBoardVariants.fakeArtistGuess && (
        <FakeArtistGuessDialog />
      )}
      {variant === drawingBoardVariants.questionMasterTitleCheck && (
        <QuestionMasterTitleCheckDialog />
      )}
      {variant === drawingBoardVariants.gameResult && <ResultDialog />}
    </div>
  );
};

export default DrawingBoardOverlay;
