import { Empty } from 'types';
import { Action, AsyncAction } from 'types/state';
import { User } from 'types/resources/user';

/* -------- State -------- */

export interface AuthState {
  isAuthenticated: boolean,
  user: User | null,
}

/* -------- Action Types -------- */

export const AUTH_USER = 'AUTH_USER';
export const DEAUTH_USER = 'DEAUTH_USER';

export type AuthUserRequestData = { email: string, password: string };
export type AuthUserResponseData = { user: User };

export type DeAuthUserData = Empty;

type AuthUserActions = AsyncAction<typeof AUTH_USER, AuthUserResponseData, AuthUserRequestData>;
type DeAuthUserActions = Action<typeof DEAUTH_USER, DeAuthUserData>;

export type AuthActions = AuthUserActions | DeAuthUserActions;
export type AuthActionTypes = typeof AUTH_USER | typeof DEAUTH_USER;
