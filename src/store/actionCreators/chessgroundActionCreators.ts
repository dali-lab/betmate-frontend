import { KeyPair } from 'chessground/types';
import { DrawShape } from 'chessground/draw';
import { ChessInstance } from 'chess.js';

import { Game } from 'types/resources/game';
import { Actions } from 'types/state';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chess: ChessInstance = require('chess.js')();

export const newMove = (game: Game): Actions => {
  const hasLastMove = game.move_hist.length > 0;
  const lm = hasLastMove
    ? game.move_hist.slice(-1)[0]
    : undefined;

  return {
    type: 'CG_NEW_MOVE',
    status: 'SUCCESS',
    payload: {
      newState: game.state,
      lastMove: lm && [lm.from, lm.to] as KeyPair,
    },
  };
};

export const onEnterMovePanel = (): Actions => ({
  type: 'CG_ENTER_MOVE_PANEL',
  status: 'SUCCESS',
  payload: {},
});

export const onLeaveMovePanel = (): Actions => ({
  type: 'CG_LEAVE_MOVE_PANEL',
  status: 'SUCCESS',
  payload: {},
});

export const createNewArrows = (game: Game): Actions => {
  chess.load(game.state);
  const topMoves = game.pool_wagers.move.options;
  const newArrows = (
    topMoves
      .map((move, i) => {
        const m = chess.move(move);
        chess.undo();
        return m ? { orig: m.from, dest: m.to, brush: String(i) } as DrawShape : null;
      })
      .filter((m): m is DrawShape => !!m)
  );

  return {
    type: 'CG_NEW_ARROWS',
    status: 'SUCCESS',
    payload: newArrows,
  };
};

export const onMoveSelect = (state: string, move: string): Actions => {
  chess.load(state);
  const m = chess.move(move);
  return {
    type: 'CG_MOVE_SELECT',
    status: 'SUCCESS',
    payload: { from: m?.from ?? '', to: m?.to ?? '' },
  };
};

export const onMoveUnselect = (): Actions => ({
  type: 'CG_MOVE_UNSELECT',
  status: 'SUCCESS',
  payload: {},
});
