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
    colorCombo?: ColorCombo;
    playerId?: number;
    voterData?: Vote[];
    fakeArtistGuess?: string;
  };
};

type Player = {
  username: string;
  id: number;
  colorCombo: ColorCombo;
};

type PlayerVoteData = {
  votedPlayerId: number;
  voterIds: number[];
};

type ColorCombo = {
  primary: string;
  secondary: string;
};
