import { call, take, put } from 'redux-saga/effects';

import * as userRequests from 'store/requests/userRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';

import {
  FetchUserData,
  CreateUserActions, FetchUserActions, UpdateUserActions, DeleteUserActions,
} from 'types/resources/user';

export function* watchCreateUser() {
  while (true) {
    try {
      const action: CreateUserActions = yield take((a: Actions) => (a.type === 'CREATE_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchUserData> = yield call(userRequests.createUser, action.payload.email, action.payload.password, action.payload.firstName, action.payload.lastName);
      yield put<Actions>({ type: 'CREATE_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchFetchUserById() {
  while (true) {
    try {
      const action: FetchUserActions = yield take((a: Actions) => (a.type === 'FETCH_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchUserData> = yield call(userRequests.fetchUserById, action.payload.uid);
      yield put<Actions>({ type: 'FETCH_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchUpdateUserById() {
  while (true) {
    try {
      const action: UpdateUserActions = yield take((a: Actions) => (a.type === 'UPDATE_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchUserData> = yield call(userRequests.updateUserById, action.payload.uid, action.payload.fields);
      yield put<Actions>({ type: 'UPDATE_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchDeleteUserById() {
  while (true) {
    try {
      const action: DeleteUserActions = yield take((a: Actions) => (a.type === 'DELETE_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      yield call(userRequests.deleteUserById, action.payload.uid);
      yield put<Actions>({ type: 'DELETE_USER', payload: { uid: action.payload.uid }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'DELETE_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
