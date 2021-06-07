export enum GameStatus {
  NOT_STARTED = 'not_started',
  DRAW = 'draw',
  BLACK_WIN = 'black_win',
  WHITE_WIN = 'white_win',
  IN_PROGRESS = 'in_progress',
}

export const getMultiplier = (odd: number): number => {
  if (odd <= 0) return 0;
  else if (odd < 2) {
    return parseFloat(odd.toFixed(2));
  } else if (odd < 10) {
    return parseFloat(odd.toFixed(1));
  } else {
    return Math.round(odd);
  }
};

export const CHESS_START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const gameOver = (game_status: GameStatus): boolean => {
  const gameOverStatuses = [GameStatus.WHITE_WIN, GameStatus.BLACK_WIN, GameStatus.DRAW];
  return gameOverStatuses.includes(game_status);
};

export const gameInProgress = (game_status: GameStatus): boolean => {
  return game_status === GameStatus.IN_PROGRESS;
};
