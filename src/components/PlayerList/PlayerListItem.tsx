import { useSelector } from "react-redux";
import PenNib from "../../assets/PenNib";
import { GameState } from "../../types/sliceStateTypes";
import PlayerIcon from "../FakeArtistPoll/PlayerIcon";

type PlayerListItemProps = {
  username: string;
  colorCombo: ColorCombo;
  isSelectedArtist: boolean;
  variant: "list" | "poll";
  voterData?: PlayerVoteData;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  let showVotesPadding, showVotesIconPosition;

  const outline = props.isSelectedArtist ? "outline outline-2 outline-black" : "";

  switch (props.variant) {
    case "list":
      showVotesPadding = "py-3";
      showVotesIconPosition = "top-2";
      break;
    case "poll":
      showVotesPadding = "pt-3 h-20";
      showVotesIconPosition = "top-9";
      break;
  }

  const { players } = useSelector((state: GameState) => state.gameState);

  return (
    <div
      className={`rounded-md ${outline} font-bold ${showVotesPadding} px-4 mb-2 w-52 overflow-hidden flex flex-col relative shadow-md`}
      style={{
        color: props.colorCombo.secondary,
        backgroundColor: props.colorCombo.primary,
      }}
    >
      <div className="">{props.username}</div>
      {props.voterData && (
        <div className="flex mt-1 bg-fake-white w-fit pl-1 py-1 rounded">
          {props.voterData.voterIds.map((voterId) => {
            const votedPlayer = players.find((p) => p.id === voterId);
            if (!votedPlayer) return; // no element rendered
            return (
              <div className="mr-1">
                <PlayerIcon colorCombo={votedPlayer.colorCombo} />
              </div>
            );
          })}
        </div>
      )}
      <div className={`absolute w-14 right-[-6px] ${showVotesIconPosition}`}>
        <PenNib color={props.colorCombo.secondary} />
      </div>
    </div>
  );
};

export default PlayerListItem;
