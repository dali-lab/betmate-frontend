import { call, take, put } from 'redux-saga/effects';

import * as gameRequests from 'store/requests/gameRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';

import {
  FetchGameData,
  CreateGameActions, FetchGameActions, UpdateGameActions, DeleteGameActions,
} from 'types/resources/game';

export function* watchCreateGame() {
  while (true) {
    try {
      const action: CreateGameActions = yield take((a: Actions) => (a.type === 'CREATE_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchGameData> = yield call(gameRequests.createGame, action.payload.state);
      yield put<Actions>({ type: 'CREATE_GAME', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchFetchGameById() {
  while (true) {
    try {
      const action: FetchGameActions = yield take((a: Actions) => (a.type === 'FETCH_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchGameData> = yield call(gameRequests.fetchGameById, action.payload.id);
      yield put<Actions>({ type: 'FETCH_GAME', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchUpdateGameById() {
  while (true) {
    try {
      const action: UpdateGameActions = yield take((a: Actions) => (a.type === 'UPDATE_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchGameData> = yield call(gameRequests.updateGameById, action.payload.id, action.payload.fields);
      yield put<Actions>({ type: 'UPDATE_GAME', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchDeleteGameById() {
  while (true) {
    try {
      const action: DeleteGameActions = yield take((a: Actions) => (a.type === 'DELETE_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      yield call(gameRequests.deleteGameById, action.payload.id);
      yield put<Actions>({ type: 'DELETE_GAME', payload: { id: action.payload.id }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'DELETE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
