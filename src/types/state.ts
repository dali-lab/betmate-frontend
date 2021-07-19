/* eslint-disable import/no-cycle */
import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';

import { Empty } from 'types';

import { RequestState } from 'types/requests';
import { SocketActions, SocketActionTypes } from 'types/socket';

import { AuthActions, AuthActionTypes, AuthState } from 'types/resources/auth';
import { GameActions, GameActionTypes, GameState } from 'types/resources/game';
import { UserActions, UserActionTypes } from 'types/resources/user';
import { WagerActions, WagerActionTypes, WagerState } from 'types/resources/wager';
import { CgActions, CgActionTypes, ChessgroundState } from './chessground';

/* -------- Action Types -------- */

export type Actions = AuthActions | GameActions | SocketActions | UserActions | WagerActions | CgActions;
export type ActionTypes = AuthActionTypes | GameActionTypes | SocketActionTypes | UserActionTypes | WagerActionTypes | CgActionTypes;

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export type RequestStatus = typeof REQUEST | typeof SUCCESS | typeof FAILURE;

export type ActionWithStatus = `${ActionTypes}_${RequestStatus}`;

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

export type RequestReturnType<D> = AxiosResponse<D>;

/* -------- State -------- */

export interface RootState {
  auth: AuthState,
  chessground: ChessgroundState,
  game: GameState,
  requests: RequestState,
  wager: WagerState
}
