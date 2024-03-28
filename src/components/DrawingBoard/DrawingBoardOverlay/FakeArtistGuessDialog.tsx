import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setFakeArtistGuess } from "../../../slices/gameStateSlice";
import { useParams } from "react-router-dom";

const WS_URL = import.meta.env.VITE_WS_URL!;

const FakeArtistGuessDialog = () => {
  const { sendJsonMessage } = useWebSocket<WebSocketData>(WS_URL, {
    share: true,
  });

  const { gameId } = useParams();

  const dispatch = useDispatch();
  const [fakeArtistGuessInput, setFakeArtistGuessInput] = useState("");

  const handleTitleGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFakeArtistGuessInput(e.target.value);
  };

  const guessTitle = () => {
    sendJsonMessage({
      type: "fakeArtistTitleGuess",
      data: { gameId, fakeArtistGuess: fakeArtistGuessInput },
    });
    dispatch(setFakeArtistGuess({ fakeArtistGuess: fakeArtistGuessInput }));
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 px-5 bg-fake-white border rounded-md border-black">
      <div className="mb-4">The real artists found you!</div>

      <input
        onChange={handleTitleGuessChange}
        className="border border-black mb-4 py-2 px-4"
        placeholder="Guess the title"
        required
      />

      <div className="btn-fake-yellow" onClick={guessTitle}>
        Create Prompt
      </div>
    </div>
  );
};

export default FakeArtistGuessDialog;
