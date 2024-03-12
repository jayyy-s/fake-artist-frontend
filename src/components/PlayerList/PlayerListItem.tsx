import PenNib from "../../assets/PenNib";

type PlayerListItemProps = {
  username: string;
  colorCombo: ColorCombo;
  isCurrentArtist: boolean;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  const outline = props.isCurrentArtist ? "border-black border-2" : "";

  return (
    <div
      className={`rounded-md ${outline} font-bold items-center py-2 px-4 mb-2 w-62 h-12 overflow-hidden flex relative shadow-md`}
      style={{
        color: props.colorCombo.secondary,
        backgroundColor: props.colorCombo.primary,
      }}
    >
      <div className="">{props.username}</div>
      <div className="absolute w-14 right-[-2px] top-2">
        <PenNib color={props.colorCombo.secondary} />
      </div>
    </div>
  );
};

export default PlayerListItem;
