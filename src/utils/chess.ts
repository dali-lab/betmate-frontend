import { GameStatus } from 'types/resources/game';

import { Chess as chess } from 'chess.js';
import { DrawShape } from 'chessground/draw';
import { FromTo } from 'types/chessground';

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

export const getFromTo = (state: string, move: string): FromTo => {
  const game = chess(state);
  const m = game.move(move);
  return { from: m?.from ?? '', to: m?.to ?? '' };
};

export const getBrush = (state: string): ((move: string, i: number) => DrawShape | null) => {
  const game = chess(state);
  return (move, i) => {
    const m = game.move(move);
    game.undo();
    return m && { orig: m.from, dest: m.to, brush: String(i) } as DrawShape;
  };
};

export const selectDrawshape = (autoShapes: DrawShape[], move: FromTo): DrawShape[] => (
  autoShapes.filter((s) => s.orig === move.from && s.dest === move.to)
);

export const fromToEqual = (a: FromTo, b: FromTo): boolean => (
  a.to === b.to && a.from === b.from
);
