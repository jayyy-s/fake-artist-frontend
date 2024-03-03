import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import PlayerListItem from "./PlayerListItem";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentArtist } from "../../slices/gameStateSlice";

const WS_URL = import.meta.env.VITE_WS_URL!;

// ISSUE: Players disconnecting on their turn messes up turn order (stuck)

const PlayerList = () => {
  const { lastJsonMessage } = useWebSocket<PlayersWebSocketData>(WS_URL, {
    share: true,
  });

  const dispatch = useDispatch();

  const [players, setPlayers] = useState<Player[]>([]);

  const { currentArtist } = useSelector((state: GameState) => state.gameState);

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "updatePlayers":
          if (!lastJsonMessage.data.players) return;
          setPlayers(lastJsonMessage.data.players);
          break;
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
    <div className="flex flex-col">
      {players.map((p) => (
        <PlayerListItem
          username={p.username}
          isCurrentArtist={currentArtist && currentArtist.id === p.id}
          key={p.id}
        />
      ))}
    </div>
  );
};

export default PlayerList;
