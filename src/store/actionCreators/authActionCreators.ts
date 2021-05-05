import { Actions } from 'types/state';
import { authTokenName } from 'utils';

export const signUpUser = (email: string, password: string, firstName: string, lastName: string): Actions => ({
  type: 'CREATE_USER',
  status: 'REQUEST',
  payload: {
    email,
    password,
    firstName,
    lastName,
  },
});

export const signInUser = (email: string, password: string): Actions => ({
  type: 'SIGN_IN_USER',
  status: 'REQUEST',
  payload: {
    email,
    password,
  },
});

export const signOutUser = (): Actions => ({
  type: 'DEAUTH_USER',
  status: 'SUCCESS',
  payload: {},
});

export const jwtSignIn = (): Actions => ({
  type: 'JWT_SIGN_IN',
  status: 'REQUEST',
  payload: { token: localStorage.getItem(authTokenName) || '' },
});
