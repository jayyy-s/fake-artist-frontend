import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import PlayerListItem from "./PlayerListItem";

const WS_URL = import.meta.env.VITE_WS_URL!;

type PlayersWebSocketData = {
  type: string;
  data: {
    players?: Player[];
    currentArtist?: Player;
  };
};

type Player = {
  username: string;
  id: number;
};

// ISSUE: Players disconnecting on their turn messes up turn order (stuck)

const PlayerList = () => {
  const { lastJsonMessage } = useWebSocket<PlayersWebSocketData>(WS_URL, {
    share: true,
  });

  const [players, setPlayers] = useState<Player[]>([]);
  const [currentArtist, setCurrentArtist] = useState<Player>({
    username: "",
    id: 0,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "updatePlayers":
          if (!lastJsonMessage.data.players) return;
          setPlayers(lastJsonMessage.data.players);
          break;
        case "setCurrentArtist":
          if (!lastJsonMessage.data.currentArtist) return;
          console.log(lastJsonMessage.data.currentArtist);
          setCurrentArtist(lastJsonMessage.data.currentArtist);
          break;
      }
    }
  }, [currentArtist, lastJsonMessage]);

  return (
    <div className="flex flex-col">
      {players.map((p) => (
        <PlayerListItem
          username={p.username}
          isCurrentArtist={currentArtist.username === p.username}
        />
      ))}
    </div>
  );
};

export default PlayerList;
