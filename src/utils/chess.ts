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
