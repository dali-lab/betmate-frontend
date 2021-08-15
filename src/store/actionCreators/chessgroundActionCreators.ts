import { KeyPair } from 'chessground/types';
import { DrawShape } from 'chessground/draw';

import { Move } from 'types/resources/game';
import { Actions } from 'types/state';
import { getBrush, getFromTo } from 'utils/chess';

export const newMove = (state: string, moveHist: Move[]): Actions => {
  const hasLastMove = moveHist.length > 0;
  const lm = hasLastMove
    ? moveHist[moveHist.length - 1]
    : undefined;

  return {
    type: 'CG_NEW_MOVE',
    status: 'SUCCESS',
    payload: {
      newState: state,
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

export const createNewArrows = (state: string, moveOptions: string[]): Actions => {
  const newArrows = (
    moveOptions
      .map(getBrush(state))
      .filter((m): m is DrawShape => !!m)
  );

  return {
    type: 'CG_NEW_ARROWS',
    status: 'SUCCESS',
    payload: newArrows,
  };
};

export const onMoveHover = (state: string, move: string): Actions => ({
  type: 'CG_MOVE_HOVER',
  status: 'SUCCESS',
  payload: getFromTo(state, move),
});

export const onMoveUnhover = (): Actions => ({
  type: 'CG_MOVE_UNHOVER',
  status: 'SUCCESS',
  payload: {},
});
