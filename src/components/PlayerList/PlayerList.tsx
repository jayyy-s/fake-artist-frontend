import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import PlayerListItem from "./PlayerListItem";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentArtist } from "../../slices/gameStateSlice";
import { GameState } from "../../types/sliceStateTypes";
import { gamePhases } from "../../types/enums";

const WS_URL = import.meta.env.VITE_WS_URL!;

const PlayerList = () => {
  const { lastJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const dispatch = useDispatch();

  const { currentArtist, gamePhase, players } = useSelector(
    (state: GameState) => state.gameState
  );

  useEffect(() => {
    console.log(currentArtist);
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "setCurrentArtist":
          if (!lastJsonMessage.data.currentArtist) return;
          dispatch(
            setCurrentArtist({
              currentArtist: lastJsonMessage.data.currentArtist,
            })
          );
          break;
      }
    }
  }, [currentArtist, dispatch, lastJsonMessage]);

  return (
    <div className="flex flex-col px-2 pt-2 rounded border-black bg-fake-white">
      {players.map((p) => (
        <PlayerListItem
          username={p.username}
          colorCombo={p.colorCombo}
          isSelectedArtist={
            gamePhase === gamePhases.active &&
            currentArtist &&
            currentArtist.id === p.id
          }
          key={p.id}
        />
      ))}
    </div>
  );
};

export default PlayerList;
