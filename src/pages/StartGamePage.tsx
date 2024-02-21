import { useNavigate } from "react-router-dom";
import { useCreateGameMutation } from "../slices/gamesApiSice";

const StartGamePage = () => {
  const navigate = useNavigate();

  const [createGame] = useCreateGameMutation();

  const handleCreateGame = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await createGame({}).unwrap();
      const { gameId } = res;
      navigate(`game/${gameId}`);
    } catch (err) {
      const e = err as Error;
      console.log(e?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="border rounded-md border-black bg-slate-50 flex flex-col items-center justify-center w-72 h-36">
        <div className="text-slate-700">Join Input</div>
        <div className="px-2 my-3 w-full">
          <div className="border-t h-1 border-gray-500"></div>
        </div>
        <div
          className="btn-fake-yellow"
          onClick={handleCreateGame}
        >
          Create Game
        </div>
      </div>
    </div>
  );
};

export default StartGamePage;
