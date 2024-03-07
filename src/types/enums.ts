const gamePhases = {
  inactive: "inactive",
  active: "active",
  voting: "voting",
  gameEnd: "gameEnd",
} as const;

type GamePhase = (typeof gamePhases)[keyof typeof gamePhases];

export { gamePhases };
export type { GamePhase };
