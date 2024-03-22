import PenNib from "../../assets/PenNib";

type PlayerIconProps = {
  colorCombo: ColorCombo;
};

const PlayerIcon = (props: PlayerIconProps) => {
  const { primary, secondary } = props.colorCombo;

  return (
    <div
      className="w-5 h-5 p-1 rounded relative overflow-hidden"
      style={{ backgroundColor: primary }}
    >
      <div className="w-4 h-4 absolute top-[6px] right-[-2px]">
        <PenNib color={secondary} />
      </div>
    </div>
  );
};

export default PlayerIcon;
