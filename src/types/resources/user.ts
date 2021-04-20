import { Empty } from '..';
import { AsyncAction } from '../state';

/* -------- State -------- */

export interface User {
  email: string,
  password: string,
  first_name?: string,
  last_name?: string,
  full_name?: string,
  account: number,
  wager_hist: string[],
}

export interface UserState {
  users: Record<string, User>
}

/* -------- Action Types -------- */

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export type CreateUserRequestData = { email: string, password: string, firstName: string, lastName: string };
export type CreateUserResponseData = { user: User };

export type UpdateUserRequestData = { uid: string, fields: Partial<User> };
export type UpdateUserResponseData = { user: User };

export type DeleteUserRequestData = { uid: string };
export type DeleteUserResponseData = Empty;

type CreateUserActions = AsyncAction<typeof CREATE_USER, CreateUserResponseData, CreateUserRequestData>;
type UpdateUserActions = AsyncAction<typeof UPDATE_USER, UpdateUserResponseData, UpdateUserRequestData>;
type DeleteUserActions = AsyncAction<typeof DELETE_USER, DeleteUserResponseData, DeleteUserRequestData>;

export type UserActions = CreateUserActions | UpdateUserActions | DeleteUserActions;
export type UserActionTypes = typeof CREATE_USER | typeof UPDATE_USER | typeof DELETE_USER;
