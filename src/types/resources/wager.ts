/* eslint-disable import/no-cycle */
// import { Move } from 'chess.js';
import { AsyncAction } from 'types/state';

export type WagerWDL = 'win' | 'draw' | 'loss';

export enum WagerStatus {
  PENDING = 'pending',
  WON = 'won',
  LOST = 'lost',
  CANCELLED = 'cancelled',
}

export interface Wager {
  _id: string,
  game_id: string,
  better_id: string,
  wdl: boolean,
  amount: number,
  odds: number,
  data: string,
  move_number: number,
  resolved: boolean,
  status: WagerStatus,
  winning_pool_share?: number,
  winnings?: number,
  created_at: Date,
  updated_at: Date,
}

export interface FeedWager extends Wager {
  time: Date
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

export type CreateWagerRequestData = {
  gameId: string,
  wager: string,
  amount: number,
  wdl: boolean,
  odds: number,
  moveNumber: number,
};
export type FetchWagerRequestData = { id: string };
export type UpdateWagerRequestData = { id: string, fields: Partial<Wager> };
export type DeleteWagerRequestData = { id: string };

export type FetchWagerData = Wager;
export type FetchWagersData = Wager[];
export type DeleteWagerData = { id: string };
export type WagerResultData = { gameId: string, wagers: Wager[] }; // ws

export type CreateWagerActions = AsyncAction<typeof CREATE_WAGER, FetchWagerData, CreateWagerRequestData>;
export type FetchWagerActions = AsyncAction<typeof FETCH_WAGER, FetchWagerData, FetchWagerRequestData>;
export type UpdateWagerActions = AsyncAction<typeof UPDATE_WAGER, FetchWagerData, UpdateWagerRequestData>;
export type DeleteWagerActions = AsyncAction<typeof DELETE_WAGER, DeleteWagerData, DeleteWagerRequestData>;
export type FetchWagersActions = AsyncAction<typeof FETCH_WAGERS, FetchWagersData>;

export type WagerActions = CreateWagerActions | FetchWagerActions | UpdateWagerActions | DeleteWagerActions | FetchWagersActions | DeleteWagerActions;
export type WagerActionTypes = typeof CREATE_WAGER | typeof FETCH_WAGER | typeof UPDATE_WAGER | typeof DELETE_WAGER | typeof FETCH_WAGERS;
