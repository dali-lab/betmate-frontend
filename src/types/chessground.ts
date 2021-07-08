/* eslint-disable import/no-cycle */
import { Config } from 'chessground/config';
import { KeyPair } from 'chessground/types';
import { DrawShape } from 'chessground/draw';
import { Action } from './state';

/* -------- State -------- */

export type FromTo = { from: string, to: string };

export interface ChessgroundState {
  config: Config,
  autoShapes: DrawShape[]
  showAutoShapes: boolean
  selected?: FromTo;
}

/* -------- Action Types -------- */

export const CG_NEW_MOVE = 'CG_NEW_MOVE';
export const CG_ENTER_MOVE_PANEL = 'CG_ENTER_MOVE_PANEL';
export const CG_LEAVE_MOVE_PANEL = 'CG_LEAVE_MOVE_PANEL';
export const CG_NEW_ARROWS = 'CG_NEW_ARROWS';
export const CG_MOVE_SELECT = 'CG_MOVE_SELECT';
export const CG_MOVE_UNSELECT = 'CG_MOVE_UNSELECT';

export type CgNewMoveData = { newState: string, lastMove?: KeyPair };
export type CgNewArrowsData = DrawShape[];
export type CgMoveSelectData = FromTo;

export type CgNewMoveActions = Action<typeof CG_NEW_MOVE, CgNewMoveData>;
export type CgEnterMovePanelActions = Action<typeof CG_ENTER_MOVE_PANEL>;
export type CgLeaveMovePanelActions = Action<typeof CG_LEAVE_MOVE_PANEL>;
export type CgNewArrowsActions = Action<typeof CG_NEW_ARROWS, CgNewArrowsData>;
export type CgMoveSelectActions = Action<typeof CG_MOVE_SELECT, CgMoveSelectData>;
export type CgMoveUnselectActions = Action<typeof CG_MOVE_UNSELECT>;

export type CgActions =
    CgNewMoveActions | CgEnterMovePanelActions | CgLeaveMovePanelActions |
    CgNewArrowsActions | CgMoveSelectActions | CgMoveUnselectActions;

export type CgActionTypes =
    typeof CG_NEW_MOVE | typeof CG_ENTER_MOVE_PANEL | typeof CG_LEAVE_MOVE_PANEL |
    typeof CG_NEW_ARROWS | typeof CG_MOVE_SELECT | typeof CG_MOVE_UNSELECT;
