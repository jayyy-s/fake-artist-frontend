import { useParams } from "react-router-dom";
import DrawingBoard from "../components/DrawingBoard";

const BASE_URL = "localhost:3000";

const GameScreen = () => {
  const { gameId } = useParams();
  const joinGameUrl = `${BASE_URL}/join/${gameId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(joinGameUrl);
  };

  return (
    <div className="px-12 py-12 h-screen">
      <div>A Fake Artist</div>
      <DrawingBoard />
      <div onClick={copyUrl} className="border border-black mb-4 py-2 px-4">
        {joinGameUrl}
      </div>
    </div>
  );
};

export default GameScreen;
