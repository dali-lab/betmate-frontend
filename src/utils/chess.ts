export enum GameStatus {
  NOT_STARTED = 'not_started',
  DRAW = 'draw',
  BLACK_WIN = 'black_win',
  WHITE_WIN = 'white_win',
  IN_PROGRESS = 'in_progress',
}

export const getMultiplier = (odd: number): number => {
  if (odd <= 0) return 0;
  const multiplier = odd;
  if (multiplier < 2) {
    return parseFloat(multiplier.toFixed(2));
  } else if (multiplier < 10) {
    return parseFloat(multiplier.toFixed(1));
  } else {
    return Math.round(multiplier);
  }
};

export const CHESS_START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
