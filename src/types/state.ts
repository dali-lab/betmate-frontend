/* eslint-disable import/no-cycle */
import { AxiosResponse } from 'axios';
import { Action as ReduxActionType } from 'redux';

import { Empty } from 'types';

import { RequestState } from 'types/requests';
import { SocketActions, SocketActionTypes } from 'types/socket';

import { AuthActions, AuthActionTypes, AuthState } from 'types/resources/auth';
import { GameActions, GameActionTypes, GameState } from 'types/resources/game';
import { WagerActions, WagerActionTypes, WagerState } from 'types/resources/wager';
import { CgActions, CgActionTypes, ChessgroundState } from './chessground';
import { LeaderboardActions, LeaderboardActionTypes, LeaderboardState } from './leaderboard';

/* -------- Action Types -------- */

export type Actions =
  AuthActions | GameActions | SocketActions | WagerActions | CgActions | LeaderboardActions;
export type ActionTypes =
  AuthActionTypes | GameActionTypes | SocketActionTypes | WagerActionTypes | CgActionTypes |
  LeaderboardActionTypes;

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

export type RequestReturnType<D> = AxiosResponse<D>;

/* -------- State -------- */

export interface RootState {
  auth: AuthState,
  chessground: ChessgroundState,
  game: GameState,
  leaderboard: LeaderboardState,
  requests: RequestState,
  wager: WagerState
}
