import { Empty } from '.';
import { Action } from './state';

// /* -------- State -------- */

export interface User {
  email: string,
  password: string,
  first_name?: string,
  last_name?: string,
  full_name?: string,
  account: number,
  wager_hist: string[],
}

export interface AuthState {
  isAuthenticated: boolean,
  user: User | null,
}

/* -------- Action Types -------- */

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export type AuthUserData = { user: User };
export type DeAuthUserData = Empty;
export type CreateUserData = { user: User };
export type UpdateUserData = { user: User };
export type DeleteUserData = Empty;

type AuthUserAction = Action<typeof AUTH_USER, AuthUserData>;
type DeAuthUserAction = Action<typeof DEAUTH_USER, DeAuthUserData>;
type CreateUserAction = Action<typeof CREATE_USER, AuthUserData>;
type UpdateUserAction = Action<typeof UPDATE_USER, AuthUserData>;
type DeleteUserAction = Action<typeof DELETE_USER, DeAuthUserData>;

export type AuthActions = AuthUserAction | DeAuthUserAction | CreateUserAction | UpdateUserAction | DeleteUserAction;
export type AuthActionTypes = typeof AUTH_USER | typeof DEAUTH_USER | typeof CREATE_USER | typeof UPDATE_USER | typeof DELETE_USER;
