// import { Move } from 'chess.js';
import { AsyncAction } from 'types/state';

export type WagerWDL = 'win' | 'draw' | 'loss';
// export type WagerMove = [Move, number, boolean];

export interface Wager {
  gameId: string,
  wdl: boolean,
  amount: number,
  odds: number,
  data: WagerWDL,
  resolved: boolean,
  _id: string
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

export type CreateWagerActions = AsyncAction<typeof CREATE_WAGER, FetchWagerData, CreateWagerRequestData>;
export type FetchWagerActions = AsyncAction<typeof FETCH_WAGER, FetchWagerData, FetchWagerRequestData>;
export type UpdateWagerActions = AsyncAction<typeof UPDATE_WAGER, FetchWagerData, UpdateWagerRequestData>;
export type DeleteWagerActions = AsyncAction<typeof DELETE_WAGER, DeleteWagerData, DeleteWagerRequestData>;
export type FetchWagersActions = AsyncAction<typeof FETCH_WAGERS, FetchWagersData>;

export type WagerActions = CreateWagerActions | FetchWagerActions | UpdateWagerActions | DeleteWagerActions | FetchWagersActions | DeleteWagerActions;
export type WagerActionTypes = typeof CREATE_WAGER | typeof FETCH_WAGER | typeof UPDATE_WAGER | typeof DELETE_WAGER | typeof FETCH_WAGERS;
