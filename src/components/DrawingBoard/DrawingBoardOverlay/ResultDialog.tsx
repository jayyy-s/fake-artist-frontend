import { useSelector } from "react-redux";
import { GameState } from "../../../types/sliceStateTypes";
import { playerTypes } from "../../../types/enums";

const ResultDialog = () => {
  const { winner } = useSelector((state: GameState) => state.gameState);
  let winnerText = "";
  switch (winner) {
    case playerTypes.fakeArtist:
      winnerText = "Fake Artist";
      break;
    case playerTypes.realArtist:
      winnerText = "Real Artists";
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center relative w-72 h-36 bg-fake-white border rounded-md border-black">
      <div>Winner: {winnerText}</div>
    </div>
  );
};

export default ResultDialog;
