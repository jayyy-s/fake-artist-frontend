import DrawingBoard from "../components/DrawingBoard";

const GameScreen = () => {
  return (
    <div className="px-12 py-12 h-screen">
      <div>A Fake Artist</div>
      <DrawingBoard />
    </div>
  );
};

export default GameScreen;
