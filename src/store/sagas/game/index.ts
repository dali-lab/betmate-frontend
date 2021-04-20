import {
  put, call, fork, take,
} from 'redux-saga/effects';

import * as gameRequests from 'store/requests/gameRequests';
import { getErrorPayload } from 'utils/error';

import {
  FetchGameData,
  CreateGameActions, FetchGameActions, UpdateGameActions, DeleteGameActions,
} from 'types/resources/game';

import { Actions, RequestReturnType } from 'types/state';

/* -------- Effects -------- */

function* createGameSaga(action: CreateGameActions) {
  if (action.status !== 'REQUEST') return;
  const response: RequestReturnType<FetchGameData> = yield call(gameRequests.createGame, action.payload.state);
  yield put<Actions>({ type: 'CREATE_GAME', payload: { game: response.data.game }, status: 'SUCCESS' });
}

function* fetchGameByIdSaga(action: FetchGameActions) {
  if (action.status !== 'REQUEST') return;
  const response: RequestReturnType<FetchGameData> = yield call(gameRequests.fetchGameById, action.payload.id);
  yield put<Actions>({ type: 'FETCH_GAME', payload: { game: response.data.game }, status: 'SUCCESS' });
}

function* updateGameByIdSaga(action: UpdateGameActions) {
  if (action.status !== 'REQUEST') return;
  const response: RequestReturnType<FetchGameData> = yield call(gameRequests.updateGameById, action.payload.id, action.payload.fields);
  yield put<Actions>({ type: 'UPDATE_GAME', payload: { game: response.data.game }, status: 'SUCCESS' });
}

function* deleteGameByIdSaga(action: DeleteGameActions) {
  if (action.status !== 'REQUEST') return;
  yield call(gameRequests.deleteGameById, action.payload.id);
  yield put<Actions>({ type: 'DELETE_GAME', payload: { id: action.payload.id }, status: 'SUCCESS' });
}

/* -------- Watchers -------- */

function* watchCreateGame() {
  while (true) {
    try {
      const action = yield take((a: Actions) => (a.type === 'CREATE_GAME' && a.status === 'REQUEST'));
      yield call(createGameSaga, action);
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

function* watchFetchGameById() {
  while (true) {
    try {
      const action = yield take((a: Actions) => (a.type === 'FETCH_GAME' && a.status === 'REQUEST'));
      yield call(fetchGameByIdSaga, action);
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

function* watchUpdateGameById() {
  while (true) {
    try {
      const action = yield take((a: Actions) => (a.type === 'UPDATE_GAME' && a.status === 'REQUEST'));
      yield call(updateGameByIdSaga, action);
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

function* watchDeleteResourceById() {
  while (true) {
    try {
      const action = yield take((a: Actions) => (a.type === 'DELETE_GAME' && a.status === 'REQUEST'));
      yield call(deleteGameByIdSaga, action);
    } catch (error) {
      yield put<Actions>({ type: 'DELETE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

/* -------- Global -------- */

export default function* gameSaga() {
  yield fork(watchCreateGame);
  yield fork(watchFetchGameById);
  yield fork(watchUpdateGameById);
  yield fork(watchDeleteResourceById);
}
