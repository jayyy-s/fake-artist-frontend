type PlayerListItemProps = {
  username: string;
  isCurrentArtist: boolean;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  const bgColor = props.isCurrentArtist ? "bg-fake-yellow" : "bg-slate-50";

  return (
    <div
      className={`border rounded-md border-black ${bgColor} items-center justify-center py-2 px-4 mb-2 w-52`}
    >
      {props.username}
    </div>
  );
};

export default PlayerListItem;
