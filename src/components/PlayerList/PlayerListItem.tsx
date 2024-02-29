type PlayerListItemProps = {
  username: string;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  return (
    <div className="border rounded-md border-black bg-slate-50 items-center justify-center py-2 px-4 mb-2 w-40">
      {props.username}
    </div>
  );
};

export default PlayerListItem;
