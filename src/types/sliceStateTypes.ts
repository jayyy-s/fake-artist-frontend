import { GamePhase } from "./enums";

type GameState = {
  gameState: {
    currentArtist: Player;
    questionMaster: Player;
    isPromptSet: boolean;
    canvasState: string;
    gamePhase: GamePhase;
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
  };
};

export type { GameState, PlayerState, ClientState };
