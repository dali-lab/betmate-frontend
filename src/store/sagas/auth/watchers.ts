/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, take, put } from 'redux-saga/effects';

import * as authRequests from 'store/requests/authRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';
import {
  AuthUserResponseData, SignInUserActions, CreateUserActions, JwtSignInActions, JwtSignInResponseData,
} from 'types/resources/auth';
import { setBearerToken } from 'store/actionCreators';

export function* watchCreateUser() {
  while (true) {
    try {
      const action: CreateUserActions = yield take((a: Actions) => (a.type === 'CREATE_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.createUser, action.payload.email, action.payload.password, action.payload.firstName, action.payload.lastName);

      yield call(setBearerToken, response.data.token);

      yield put<Actions>({ type: 'CREATE_USER', payload: { ...response.data }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchSignInUser() {
  while (true) {
    try {
      const action: SignInUserActions = yield take((a: Actions) => (a.type === 'SIGN_IN_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.signInUser, action.payload.email, action.payload.password);

      yield call(setBearerToken, response.data.token);

      yield put<Actions>({ type: 'SIGN_IN_USER', payload: { ...response.data }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'SIGN_IN_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchJwtSignIn() {
  while (true) {
    try {
      const action: JwtSignInActions = yield take((a: Actions) => (a.type === 'JWT_SIGN_IN' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<JwtSignInResponseData> = yield call(authRequests.jwtSignIn);
      yield put<Actions>({ type: 'JWT_SIGN_IN', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'JWT_SIGN_IN', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
