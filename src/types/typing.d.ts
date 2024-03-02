type Point = {
  x: number;
  y: number;
};

type Draw = {
  prevPosition: Point;
  currentPosition: Point;
};

type DrawingBoardWebSocketData = {
  type: string;
  data: {
    canvasState?: string;
    gameState?: string;
  };
};

type GameState = {
  gameState: {
    currentArtist: string;
    questionMaster: string;
    canvasState: string;
  };
};

type PlayerState = {
  player: {
    username: string;
  };
};