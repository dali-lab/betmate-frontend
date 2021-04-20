// import { Move } from 'chess.js';
import { AsyncAction } from '../state';

export type WagerWDL = 'win' | 'draw' | 'loss';
// export type WagerMove = [Move, number, boolean];

export interface Wager {
  gameId: string,
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

export const CREATE_WAGER = 'CREATE_WAGER';
export const FETCH_WAGER = 'FETCH_WAGER';
export const UPDATE_WAGER = 'UPDATE_WAGER';
export const DELETE_WAGER = 'DELETE_WAGER';
export const FETCH_WAGERS = 'FETCH_WAGERS';

export type CreateWagerRequestData = { gameId: string, amount: number };
export type FetchWagerRequestData = { id: string };
export type UpdateWagerRequestData = { id: string, fields: Partial<Wager> };
export type DeleteWagerRequestData = { id: string };

export type FetchWagerData = { wager: Wager };
export type FetchWagersData = { wagers: Wager[] };
export type DeleteWagerData = { id: string };

type CreateWagerActions = AsyncAction<typeof CREATE_WAGER, FetchWagerData, CreateWagerRequestData>;
type FetchWagerActions = AsyncAction<typeof FETCH_WAGER, FetchWagerData, FetchWagerRequestData>;
type UpdateWagerActions = AsyncAction<typeof UPDATE_WAGER, FetchWagerData, UpdateWagerRequestData>;
type DeleteWagerActions = AsyncAction<typeof DELETE_WAGER, FetchWagerData, DeleteWagerRequestData>;
type FetchWagersActions = AsyncAction<typeof FETCH_WAGERS, FetchWagersData>;

export type WagerActions = CreateWagerActions | FetchWagerActions | UpdateWagerActions | DeleteWagerActions | FetchWagersActions | DeleteWagerActions;
export type WagerActionTypes = typeof CREATE_WAGER | typeof FETCH_WAGER | typeof UPDATE_WAGER | typeof DELETE_WAGER | typeof FETCH_WAGERS;
