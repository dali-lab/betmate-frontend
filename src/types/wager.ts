// import { Move } from 'chess.js';
import { Action, AsyncAction } from './state';

export type WagerWDL = 'win' | 'draw' | 'loss';
// export type WagerMove = [Move, number, boolean];

export interface Wager {
  game_id: string,
  wdl: boolean,
  amount: number,
  odds: number,
  data: WagerWDL,
  resolved: boolean,
  id: string
}

/* -------- State -------- */

export interface WagerState {
  wagers: Record<string, Wager>,
}

/* -------- Action Types -------- */

export const FETCH_WAGER = 'FETCH_WAGER';
export const FETCH_WAGERS = 'FETCH_WAGERS';
export const DELETE_WAGER = 'DELETE_WAGER';

export type FetchWagerData = { wager: Wager };
export type FetchWagersData = { wagers: Wager[] };
export type DeleteWagerData = { id: string };

type FetchWagerActions = AsyncAction<typeof FETCH_WAGER, FetchWagerData>;
type FetchWagersActions = AsyncAction<typeof FETCH_WAGERS, FetchWagersData>;
type DeleteWagerActions = AsyncAction<typeof DELETE_WAGER, DeleteWagerData>;

export type WagerActions = FetchWagerActions | FetchWagersActions | DeleteWagerActions;
export type WagerActionTypes = typeof FETCH_WAGER | typeof FETCH_WAGERS | typeof DELETE_WAGER;
