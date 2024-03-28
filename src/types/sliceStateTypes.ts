import { GamePhase, PlayerType } from "./enums";

type GameState = {
  gameState: {
    currentArtist: Player;
    questionMaster: Player;
    isPromptSet: boolean;
    canvasState: string;
    gamePhase: GamePhase;
    players: Player[];
    hasAllVoted: boolean;
    fakeArtistGuess: string;
    winner: PlayerType;
  };
};

type PlayerState = {
  player: Player;
};

type ClientState = {
  clientState: {
    isHost: boolean;
    isQuestionMaster: boolean;
    isFakeArtist: boolean;
  };
};

export type { GameState, PlayerState, ClientState };
