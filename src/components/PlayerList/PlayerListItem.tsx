type PlayerListItemProps = {
  username: string;
  color: string;
  isCurrentArtist: boolean;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  const outline = props.isCurrentArtist ? "border-black border-2" : "";

  return (
    <div
      className={`rounded-md ${outline} bg-slate-50 font-bold items-center justify-center py-2 px-4 mb-2 w-52`}
      style={{ color: props.color }}
    >
      {props.username}
    </div>
  );
};

export default PlayerListItem;
