/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, take, put } from 'redux-saga/effects';

import * as authRequests from 'store/requests/authRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';
import {
  AuthUserResponseData, SignInUserActions, CreateUserActions, DeAuthUserActions, JwtSignInActions,
} from 'types/resources/auth';
import { getBearerToken, removeBearerToken, setBearerToken } from 'store/actionCreators';

export function* watchCreateUser() {
  while (true) {
    try {
      const action: CreateUserActions = yield take((a: Actions) => (a.type === 'CREATE_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.createUser, action.payload.email, action.payload.password, action.payload.firstName, action.payload.lastName);

      yield call(setBearerToken, response.data.token);

      yield put<Actions>({ type: 'JOIN_AUTH', payload: { token: response.data.token }, status: 'REQUEST' });
      yield put<Actions>({ type: 'CREATE_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchSignInUser() {
  while (true) {
    try {
      const action: SignInUserActions = yield take((a: Actions) => (a.type === 'SIGN_IN_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.signInUser, action.payload.email, action.payload.password);

      yield call(setBearerToken, response.data.token);

      yield put<Actions>({ type: 'JOIN_AUTH', payload: { token: response.data.token }, status: 'REQUEST' });
      yield put<Actions>({ type: 'SIGN_IN_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'SIGN_IN_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchDeauthUser() {
  while (true) {
    try {
      const action: DeAuthUserActions = yield take((a: Actions) => (a.type === 'DEAUTH_USER' && a.status === 'SUCCESS'));
      if (action.status !== 'SUCCESS') return; // Type protection only

      const token = yield call(getBearerToken);
      if (token) yield call(removeBearerToken);
      yield put<Actions>({ type: 'LEAVE_AUTH', payload: { token }, status: 'REQUEST' });
    } catch (error) {
      yield put<Actions>({ type: 'LEAVE_AUTH', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchJwtSignIn() {
  while (true) {
    try {
      const action: JwtSignInActions = yield take((a: Actions) => (a.type === 'JWT_SIGN_IN' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.jwtSignIn);
      yield put<Actions>({ type: 'JWT_SIGN_IN', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'JWT_SIGN_IN', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
