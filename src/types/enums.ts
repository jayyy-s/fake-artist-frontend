const gamePhases = {
  inactive: "inactive",
  active: "active",
  voting: "voting",
  gameEnd: "gameEnd",
} as const;

type GamePhase = (typeof gamePhases)[keyof typeof gamePhases];

const drawingBoardVariants = {
  default: "default",
  host: "host",
  questionMaster: "questionMaster",
  fakeArtistGuess: "fakeArtistGuess",
  questionMasterTitleCheck: "questionMasterTitleCheck",
  gameResult: "gameResult",
} as const;

type DrawingBoardVariant =
  (typeof drawingBoardVariants)[keyof typeof drawingBoardVariants];

const playerTypes = {
  realArtist: "realArtist",
  fakeArtist: "fakeArtist",
  questionMaster: "questionMaster",
};

type PlayerType = (typeof playerTypes)[keyof typeof playerTypes];

export { gamePhases, drawingBoardVariants, playerTypes };
export type { GamePhase, DrawingBoardVariant, PlayerType };
