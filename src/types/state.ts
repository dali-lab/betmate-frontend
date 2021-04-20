import { Action as ReduxActionType } from 'redux';
import { Empty } from '.';

import { RequestState } from './requests';
import { SocketActions, SocketActionTypes } from './socket';

import { AuthActions, AuthActionTypes, AuthState } from './resources/auth';
import { GameActions, GameActionTypes, GameState } from './resources/game';
import { UserActions, UserActionTypes } from './resources/user';
import { WagerActions, WagerActionTypes, WagerState } from './resources/wager';

/* -------- Action Types -------- */

export type Actions = AuthActions | GameActions | SocketActions | UserActions | WagerActions;
export type ActionTypes = AuthActionTypes | GameActionTypes | SocketActionTypes | UserActionTypes | WagerActionTypes;

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type RequestStatus = typeof REQUEST | typeof SUCCESS | typeof FAILURE;

export type Code = number | string | null;

export interface FailurePayload {
  message: string,
}

/* Action type that doesn't need to hanldle underlying loading and/or failure states */
export interface Action<T, D = unknown, S extends RequestStatus = RequestStatus> extends ReduxActionType {
  type: T,
  payload: D,
  status: S
}

/* Action type that requires handling of loading and/or failure states */
export type AsyncAction<T extends string, D, R = Empty> =
  Action<T, R, 'REQUEST'> |
  Action<T, D, 'SUCCESS'> |
  Action<T, { message: string, code: Code }, 'FAILURE'>;

/* -------- State -------- */

export interface RootState {
  auth: AuthState,
  game: GameState,
  requests: RequestState,
  wager: WagerState
}
