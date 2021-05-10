/* eslint-disable import/no-cycle */
import { Empty } from 'types';
import { Action, AsyncAction } from 'types/state';
import { User } from 'types/resources/user';

/* -------- State -------- */

export interface AuthState {
  isAuthenticated: boolean,
  user: User | null,
}

/* -------- Action Types -------- */

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const DEAUTH_USER = 'DEAUTH_USER';
export const CREATE_USER = 'CREATE_USER';
export const JWT_SIGN_IN = 'JWT_SIGN_IN';

export type CreateUserRequestData = { email: string, password: string, firstName: string, lastName: string };
export type SignInRequestData = { email: string, password: string };
export type JwtSignInRequestData = { token: string };
export type AuthUserResponseData = { user: User, token: string };
export type AuthUserPayload = { user: User };

export type DeAuthUserData = Empty;

export type CreateUserActions = AsyncAction<typeof CREATE_USER, AuthUserPayload, CreateUserRequestData>;
export type SignInUserActions = AsyncAction<typeof SIGN_IN_USER, AuthUserPayload, SignInRequestData>;
export type JwtSignInActions = AsyncAction<typeof JWT_SIGN_IN, AuthUserPayload, JwtSignInRequestData>;
export type DeAuthUserActions = Action<typeof DEAUTH_USER, DeAuthUserData>;

export type AuthActions = CreateUserActions | SignInUserActions | DeAuthUserActions | JwtSignInActions;
export type AuthActionTypes = typeof CREATE_USER | typeof SIGN_IN_USER | typeof DEAUTH_USER | typeof JWT_SIGN_IN;
