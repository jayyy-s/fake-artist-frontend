import { useNavigate, useParams } from "react-router-dom";
import DrawingBoard from "../components/DrawingBoard";
import PlayerList from "../components/PlayerList/PlayerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import { setCanvasState, setCurrentArtist } from "../slices/gameStateSlice";
import { useFetchGameByIdMutation } from "../slices/gamesApiSice";
import { useEffect, useState } from "react";

const WS_URL = import.meta.env.VITE_WS_URL!;
const BASE_URL = "localhost:3000";

const GameScreen = () => {
  const clientReadyHandler = async () => {
    try {
      const game = await fetchGameById({ gameId }).unwrap();
      dispatch(setCanvasState({ canvasState: game.canvasState }));
      if (game.currentArtist) {
        dispatch(
          setCurrentArtist({
            currentArtist: game.currentArtist,
          })
        );
      }

      setIsGameStarted(game.gameState === "active");

      sendJsonMessage({ type: "clientReady", data: { gameId, username } });
    } catch (err) {
      // if game not found (or something else went wrong) go back to the home page
      navigate("/");
    }
  };

  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<DrawingBoardWebSocketData>(WS_URL, {
      share: true,
      onOpen: clientReadyHandler,
    });

  const [isGameStarted, setIsGameStarted] = useState(false);

  const { gameId } = useParams();
  const joinGameUrl = `${BASE_URL}/join/${gameId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(joinGameUrl);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchGameById] = useFetchGameByIdMutation();

  const { username } = useSelector((state: PlayerState) => state.player);
  if (!username) {
    navigate("/");
  }

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "serverStartGame":
          setIsGameStarted(true);
          break;
        case "drawCurrentCanvasState":
          dispatch(
            setCanvasState({ canvasState: lastJsonMessage.data.canvasState })
          );
          break;
      }
    }
  }, [dispatch, lastJsonMessage]);

  return (
    <div className="px-12 py-12 h-screen flex flex-col">
      <div>A Fake Artist</div>
      <div className="flex">
        <div className="flex flex-col mr-4">
          <DrawingBoard isGameStarted={isGameStarted} />
          <div
            onClick={copyUrl}
            className="border rounded-md border-black mt-4 py-2 px-4 cursor-pointer flex items-center justify-center"
          >
            <div className="flex-1">{joinGameUrl}</div>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>
        <PlayerList />
      </div>
    </div>
  );
};

export default GameScreen;
