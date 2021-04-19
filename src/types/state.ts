import { Action as ReduxActionType } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { WagerActions, WagerActionTypes, WagerState } from './wager';

/* -------- Action Types -------- */

export type Actions = WagerActions;
export type ActionTypes = WagerActionTypes;
export type RequestStatusTypes = 'REQUEST' | 'SUCCESS' | 'FAILURE';

export interface ActionPayload<D = any> {
  data: D,
  message?: string,
//   code?: Code
}

export interface Action<T, D = any> extends ReduxActionType {
  type: T,
  status: RequestStatusTypes,
  payload: ActionPayload<D> | null
}

/* -------- State -------- */

// export interface RequestState {
//     [type: string]: SingleRequestState
//   }

export interface RootState {
  wager: WagerState,
}

export type GlobalDispatch = ThunkDispatch<RootState, undefined, Actions>;
export type ThunkResult<R = void> = ThunkAction<R, RootState, undefined, Actions>;
export type ConnectedThunkCreator<T extends (...args: any) => ThunkResult> = (...args: Parameters<T>) => void;
