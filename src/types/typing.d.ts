type Point = {
  x: number;
  y: number;
};

type Draw = {
  prevPosition: Point;
  currentPosition: Point;
};

type PlayersWebSocketData = {
  type: string;
  data: {
    players?: Player[];
    currentArtist?: Player;
  };
};

type DrawingBoardWebSocketData = {
  type: string;
  data: {
    canvasState?: string;
    gameState?: string;
  };
};

type Player = {
  username: string;
  id: number;
};

type GameState = {
  gameState: {
    currentArtist: Player;
    questionMaster: string;
    canvasState: string;
  };
};

type PlayerState = {
  player: {
    username: string;
  };
};