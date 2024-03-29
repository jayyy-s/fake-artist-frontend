import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayerUsername } from "../slices/playerSlice";
import HowToPlay from "../components/HowToPlay";

const JoinGamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gameId } = useParams();

  const [username, setUsername] = useState("");
  const [showHowToPlay, setShowHowToPlay] = useState(true);

  const handleJoinGame = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!username) return; // TODO: UX for no username
    try {
      dispatch(setPlayerUsername({ username }));
      navigate(`/game/${gameId}`);
    } catch (err) {
      const e = err as Error;
      console.log(e?.message);
    }
  };

  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full">
      {showHowToPlay && (
        <HowToPlay closeHowToPlay={() => setShowHowToPlay(false)} />
      )}
      <div className="border rounded-md border-black bg-fake-white flex flex-col items-center justify-center w-72 h-36">
        <input
          onChange={handleUsernameInputChange}
          className="border border-black mb-4 py-2 px-4"
          required
        />
        <div className="btn-fake-yellow" onClick={handleJoinGame}>
          Join Game
        </div>
      </div>
    </div>
  );
};

export default JoinGamePage;
