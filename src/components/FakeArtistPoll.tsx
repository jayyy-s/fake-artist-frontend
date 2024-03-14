import { useSelector } from "react-redux";
import { GameState, PlayerState } from "../types/sliceStateTypes";
import PlayerListItem from "./PlayerList/PlayerListItem";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";

const WS_URL = import.meta.env.VITE_WS_URL!;

const FakeArtistPoll = () => {
  const { sendJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const [votedPlayer, setVotedPLayer] = useState<Player>();
  const { gameId } = useParams();

  const { players, questionMaster } = useSelector(
    (state: GameState) => state.gameState
  );
  const { id } = useSelector((state: PlayerState) => state.player);
  const pollPlayers = players.filter(
    (p) => p.id !== id && p.id !== questionMaster.id
  );

  const castVote = () => {
    if (!votedPlayer) return;

    sendJsonMessage({ type: "castVote", data: { gameId, id: votedPlayer.id } });
  };

  return (
    <div className="flex flex-col p-2 w-52 h-fit rounded border-black bg-fake-white">
      {pollPlayers.map((p) => (
        <div className="cursor-pointer" onClick={() => setVotedPLayer(p)}>
          <PlayerListItem
            username={p.username}
            colorCombo={p.colorCombo}
            isSelectedArtist={!!votedPlayer && votedPlayer.id === p.id}
            key={p.id}
          />
        </div>
      ))}
      <div onClick={castVote} className="btn-fake-yellow mt-3">
        Vote
      </div>
    </div>
  );
};

export default FakeArtistPoll;
