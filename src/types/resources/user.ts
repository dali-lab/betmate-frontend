import { AsyncAction } from 'types/state';

/* -------- State -------- */

export interface User {
  email: string,
  password?: string,
  first_name?: string,
  last_name?: string,
  full_name?: string,
  account: number,
  wager_hist: string[],
  _id: string
}

export interface UserState {
  users: Record<string, User>
}

/* -------- Action Types -------- */

export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export type FetchUserRequestData = { uid: string };
export type UpdateUserRequestData = { uid: string, fields: Partial<User> };
export type DeleteUserRequestData = { uid: string };

export type FetchUserData = { user: User };

export type FetchUsersData = { user: User[] };
export type DeleteUserData = { uid: string };

export type FetchUserActions = AsyncAction<typeof FETCH_USER, FetchUserData, FetchUserRequestData>;
export type UpdateUserActions = AsyncAction<typeof UPDATE_USER, FetchUserData, UpdateUserRequestData>;
export type DeleteUserActions = AsyncAction<typeof DELETE_USER, DeleteUserData, DeleteUserRequestData>;

export type UserActions = FetchUserActions | UpdateUserActions | DeleteUserActions;
export type UserActionTypes = typeof FETCH_USER | typeof UPDATE_USER | typeof DELETE_USER;
