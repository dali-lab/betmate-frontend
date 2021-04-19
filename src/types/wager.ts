// import { Move } from 'chess.js';
import { Action } from './state';

export type WagerWDL = 'win' | 'draw' | 'loss';
// export type WagerMove = [Move, number, boolean];

export interface IWager {
  game_id: string,
  wdl: boolean,
  amount: number,
  odds: number,
  data: WagerWDL,
  resolved: boolean,
  id: string
}

// /* -------- State -------- */

// export interface PostState {
//   posts: Record<string, Post>,
//   results: string[],
//   numResults: number
// }

export interface WagerState {
  wagers: Record<string, IWager>,
}

/* -------- Action Types -------- */

export const FETCH_WAGER = 'FETCH_WAGER';
export const FETCH_WAGERS = 'FETCH_WAGERS';
export const DELETE_WAGER = 'DELETE_WAGER';

export type FetchWagerData = { wager: IWager };
export type FetchWagersData = { wagers: IWager[] };
export type DeleteWagerData = { id: string };

type FetchWagerAction = Action<typeof FETCH_WAGER, FetchWagerData>;
type FetchWagersAction = Action<typeof FETCH_WAGERS, FetchWagersData>;
type DeleteWagerAction = Action<typeof DELETE_WAGER, DeleteWagerData>;

export type WagerActions = FetchWagerAction | FetchWagersAction | DeleteWagerAction;
export type WagerActionTypes = typeof FETCH_WAGER | typeof FETCH_WAGERS | typeof DELETE_WAGER;
