type Point = {
  x: number;
  y: number;
};

type Draw = {
  prevPosition: Point;
  currentPosition: Point;
};

type WebSocketData = {
  type: string;
  data: {
    players?: Player[];
    currentArtist?: Player;
    questionMaster?: Player;
    canvasState?: string;
    gameState?: string;
    category?: string;
    title?: string;
    color?: string;
  }
}

type Player = {
  username: string;
  id: number;
  color: string;
};

type GameState = {
  gameState: {
    currentArtist: Player;
    questionMaster: Player;
    isPromptSet: boolean;
    canvasState: string;
  };
};

type PlayerState = {
  player: {
    username: string;
  };
};

type ClientState = {
  clientState: {
    isHost: boolean;
    isQuestionMaster: boolean;
    isFakeArtist: boolean;
    isGameStarted: boolean;
  };
};
