import { useNavigate, useParams } from "react-router-dom";
import DrawingBoard from "../components/DrawingBoard/DrawingBoard";
import PlayerList from "../components/PlayerList/PlayerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCopy } from "@fortawesome/free-solid-svg-icons";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import {
  setCanvasState,
  setCurrentArtist,
  setFakeArtistGuess,
  setHasAllVoted,
  setQuestionMaster,
  setWinner,
} from "../slices/gameStateSlice";
import { useFetchGameByIdMutation } from "../slices/gamesApiSice";
import { useEffect, useState } from "react";
import { setGamePhase, setPlayers } from "../slices/gameStateSlice";
import GameInformation from "../components/GameInformation";
import { GameState, PlayerState } from "../types/sliceStateTypes";
import { gamePhases, playerTypes } from "../types/enums";
import FakeArtistPoll from "../components/FakeArtistPoll/FakeArtistPoll";
import { connectPlayer } from "../slices/playerSlice";
import HowToPlay from "../components/HowToPlay";

const WS_URL = import.meta.env.VITE_WS_URL!;
const BASE_URL = window.location.origin;

const GameScreen = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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

      if (game.questionMaster) {
        dispatch(
          setQuestionMaster({
            questionMaster: lastJsonMessage.data.questionMaster,
          })
        );
      }

      dispatch(setGamePhase({ gamePhase: game.gameState }));

      sendJsonMessage({ type: "clientReady", data: { gameId, username } });
    } catch (err) {
      // if game not found (or something else went wrong) go back to the home page
      navigate("/");
    }
  };

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketData>(
    WS_URL,
    {
      share: true,
      onOpen: clientReadyHandler,
    }
  );

  const { gameId } = useParams();
  const joinGameUrl = `${BASE_URL}/join/${gameId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(joinGameUrl);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchGameById] = useFetchGameByIdMutation();

  const { username, id } = useSelector((state: PlayerState) => state.player);
  const { gamePhase, questionMaster, hasAllVoted } = useSelector(
    (state: GameState) => state.gameState
  );
  if (!username) {
    navigate("/");
  }

  const [voterData, setVoterData] = useState<PlayerVoteData[]>();

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "serverConnected":
          dispatch(
            connectPlayer({
              colorCombo: lastJsonMessage.data.colorCombo,
              id: lastJsonMessage.data.playerId,
            })
          );
          break;
        case "serverStartGame":
          dispatch(setGamePhase({ gamePhase: gamePhases.active }));
          dispatch(
            setQuestionMaster({
              questionMaster: lastJsonMessage.data.questionMaster,
            })
          );
          break;
        case "drawCurrentCanvasState":
          dispatch(
            setCanvasState({ canvasState: lastJsonMessage.data.canvasState })
          );
          break;
        case "votePhase":
          dispatch(setGamePhase({ gamePhase: gamePhases.voting }));
          break;
        case "updatePlayers":
          if (!lastJsonMessage.data.players) return;
          dispatch(setPlayers({ players: lastJsonMessage.data.players }));
          break;
        case "voterData":
          if (lastJsonMessage.data.voterData) {
            setVoterData(lastJsonMessage.data.voterData);
            dispatch(setHasAllVoted({ hasAllVoted: true }));
          }
          break;
        case "setFakeArtistGuess":
          if (lastJsonMessage.data.fakeArtistGuess) {
            dispatch(
              setFakeArtistGuess({
                fakeArtistGuess: lastJsonMessage.data.fakeArtistGuess,
              })
            );
          }
          break;
        case "fakeArtistWin":
          dispatch(setWinner({ winner: playerTypes.fakeArtist }));
          break;
        case "realArtistsWin":
          dispatch(setWinner({ winner: playerTypes.realArtist }));
          break;
      }
    }
  }, [dispatch, lastJsonMessage]);

  return (
    <div className="px-12 py-12 h-screen flex flex-col relative">
      {showHowToPlay && (
        <HowToPlay closeHowToPlay={() => setShowHowToPlay(false)} />
      )}
      <div className="text-fake-white mb-1">A Fake Artist</div>
      <div className="flex">
        <PlayerList />
        <div className="flex flex-col mx-4">
          <GameInformation />
          <DrawingBoard />
          <div
            onClick={copyUrl}
            className="border rounded-md border-fake-white mt-4 py-2 px-4 cursor-pointer flex items-center justify-center"
          >
            <div className="flex-1 text-fake-white">{joinGameUrl}</div>
            <FontAwesomeIcon icon={faCopy} className="text-fake-white" />
          </div>
        </div>
        {gamePhase === gamePhases.voting &&
          (hasAllVoted || id !== questionMaster.id) && (
            <FakeArtistPoll
              voterData={voterData}
              isQuestionMaster={id === questionMaster.id}
            />
          )}
      </div>
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className="absolute text-fake-white right-4 bottom-3 cursor-pointer"
        onClick={() => setShowHowToPlay(true)}
      />
    </div>
  );
};

export default GameScreen;
