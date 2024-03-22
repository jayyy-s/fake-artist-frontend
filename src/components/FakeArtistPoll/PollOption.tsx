import PlayerListItem from "../PlayerList/PlayerListItem";

type PollOptionProps = {
  player: Player;
  isSelected: boolean;
  setVotedPlayer: (selectedPlayer: Player) => void;
  voterData?: PlayerVoteData;
};

const PollOption = (props: PollOptionProps) => {
  const { player, isSelected, setVotedPlayer, voterData } = props;
  return (
    <div className="cursor-pointer p-1" onClick={() => setVotedPlayer(player)}>
      <PlayerListItem
        username={player.username}
        colorCombo={player.colorCombo}
        isSelectedArtist={isSelected}
        key={player.id}
        variant={"poll"}
        voterData={voterData}
      />
    </div>
  );
};

export default PollOption;
