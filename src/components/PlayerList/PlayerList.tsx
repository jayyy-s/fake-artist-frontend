import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import PlayerListItem from "./PlayerListItem";

const WS_URL = import.meta.env.VITE_WS_URL!;

type PlayersWebSocketData = {
  type: string;
  data: {
    players: string[];
  };
};

const PlayerList = () => {
  const { lastJsonMessage } = useWebSocket<PlayersWebSocketData>(WS_URL, {
    share: true,
  });

  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case "updatePlayers":
          setPlayers(lastJsonMessage.data.players);
          break;
      }
    }
  }, [lastJsonMessage]);

  return (
    <div className="flex flex-col">
        {players.map((p) => (
          <PlayerListItem username={p} />
        ))}
    </div>
  );
};

export default PlayerList;
