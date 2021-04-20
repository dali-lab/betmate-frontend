/* -------- State -------- */

import { Action, Actions } from './state';

export interface RequestState {
  [id: string]: {
    isLoading: boolean,
    message: string,
    code: string | number // | null
  }
}

export type ErrorData = { message: string };
export type ErrorAction = Action<Actions, ErrorData>;

export type RequestActions = ErrorAction;
