import { useParams } from "react-router-dom";
import DrawingBoard from "../components/DrawingBoard";
import PlayerList from "../components/PlayerList/PlayerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "localhost:3000";

const GameScreen = () => {
  const { gameId } = useParams();
  const joinGameUrl = `${BASE_URL}/join/${gameId}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(joinGameUrl);
  };

  return (
    <div className="px-12 py-12 h-screen flex flex-col">
      <div>A Fake Artist</div>
      <div className="flex">
        <div className="flex flex-col mr-4">
          <DrawingBoard />
          <div
            onClick={copyUrl}
            className="border rounded-md border-black mt-4 py-2 px-4 cursor-pointer flex items-center justify-center"
          >
            <div className="flex-1">{joinGameUrl}</div>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>
        <PlayerList />
      </div>
    </div>
  );
};

export default GameScreen;
