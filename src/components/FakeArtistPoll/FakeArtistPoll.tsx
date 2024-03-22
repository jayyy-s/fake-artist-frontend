import { useSelector } from "react-redux";
import { GameState } from "../../types/sliceStateTypes";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import PollOption from "./PollOption";

const WS_URL = import.meta.env.VITE_WS_URL!;

type FakeArtistPollProps = {
  voterData?: PlayerVoteData[];
  isQuestionMaster: boolean;
};

// TODO: Change UI after player has voted to prevent changing vote + indicate vote has been counted
const FakeArtistPoll = (props: FakeArtistPollProps) => {
  const { voterData, isQuestionMaster } = props;

  const { sendJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const [hasVoted, setHasVoted] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState<Player>();
  const { gameId } = useParams();

  const { players, questionMaster } = useSelector(
    (state: GameState) => state.gameState
  );

  const pollPlayers = players.filter((p) => p.id !== questionMaster.id);

  const castVote = () => {
    if (!votedPlayer || hasVoted) return;

    sendJsonMessage({ type: "castVote", data: { gameId, id: votedPlayer.id } });
    setHasVoted(true);
  };

  const chooseVote = (selectedPlayer: Player) => {
    if (hasVoted) return;

    setVotedPlayer(selectedPlayer);
  };

  return (
    <div className="flex flex-col p-2 w-fit h-fit rounded border-black bg-fake-white">
      <div className="grid grid-cols-2">
        {pollPlayers.map((p) => (
          <PollOption
            player={p}
            isSelected={!!votedPlayer && votedPlayer.id === p.id}
            setVotedPlayer={chooseVote}
            voterData={voterData?.find((data) => data.votedPlayerId === p.id)}
          />
        ))}
      </div>
      {!isQuestionMaster && (
        <div onClick={castVote} className="btn-fake-yellow mt-3">
          Vote
        </div>
      )}
    </div>
  );
};

export default FakeArtistPoll;
