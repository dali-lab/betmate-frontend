import { Action as ReduxActionType } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthActions, AuthActionTypes, AuthState } from './auth';
import { RequestState } from './requests';
import { WagerActions, WagerActionTypes, WagerState } from './wager';

/* -------- Action Types -------- */

export type Actions = WagerActions | AuthActions;
export type ActionTypes = WagerActionTypes | AuthActionTypes;
export type RequestStatusTypes = 'REQUEST' | 'SUCCESS' | 'FAILURE' | 'CLEAR_ERR';

export interface ActionPayload<D = any> {
  data: D,
  message?: string,
  code?: number
}

export interface FailurePayload {
  message: string,
}

export interface Action<T, D = any> extends ReduxActionType {
  type: T,
  status: RequestStatusTypes,
  payload: ActionPayload<D>
}

/* -------- State -------- */

// export interface RequestState {
//     [type: string]: SingleRequestState
//   }

export interface RootState {
  wager: WagerState,
  auth: AuthState,
  requests: RequestState
}

export type GlobalDispatch = ThunkDispatch<RootState, undefined, Actions>;
export type ThunkResult<R = void> = ThunkAction<R, RootState, undefined, Actions>;
export type ConnectedThunkCreator<T extends (...args: any) => ThunkResult> = (...args: Parameters<T>) => void;
