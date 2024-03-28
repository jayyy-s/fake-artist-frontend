type StartGameDialogProps = {
  startGameHandler: () => void;
  errorMessage: string;
};

const StartGameDialog = (props: StartGameDialogProps) => {
  const { startGameHandler, errorMessage } = props;

  return (
    <div className="flex flex-col items-center justify-center relative w-72 h-36 bg-fake-white border rounded-md border-black">
      <div onClick={startGameHandler} className="btn-fake-yellow">
        Start Game
      </div>
      {errorMessage && (
        <span className="text-red-600 absolute bottom-3">{errorMessage}</span>
      )}
    </div>
  );
};

export default StartGameDialog;
