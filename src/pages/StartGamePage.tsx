import { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateGameMutation } from "../slices/gamesApiSice";
import { useDispatch } from "react-redux";
import { setPlayerUsername } from "../slices/playerSlice";

const StartGamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createGame] = useCreateGameMutation();

  const [username, setUsername] = useState("");

  const handleCreateGame = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!username) return; // TODO: UX for no username
    try {
      const res = await createGame({}).unwrap();
      const { gameId } = res;
      dispatch(setPlayerUsername({ username }));
      navigate(`game/${gameId}`);
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
      <div className="border rounded-md border-black bg-slate-50 flex flex-col items-center justify-center w-72 h-36">
        <input
          onChange={handleUsernameInputChange}
          className="border border-black mb-4 py-2 px-4"
          required
        />
        <div className="btn-fake-yellow" onClick={handleCreateGame}>
          Create Game
        </div>
      </div>
    </div>
  );
};

export default StartGamePage;
