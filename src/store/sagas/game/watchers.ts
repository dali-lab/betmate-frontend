/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  call, take, put,
} from 'redux-saga/effects';

import * as gameRequests from 'store/requests/gameRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';

import {
  FetchGameData,
  FetchGamesData,
  FetchGameActions,
  FetchGamesActions,
} from 'types/resources/game';

export function* watchFetchGameById() {
  while (true) {
    try {
      const action: FetchGameActions = yield take((a: Actions) => (a.type === 'FETCH_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<FetchGameData> = yield call(gameRequests.fetchGameById, action.payload.id);
      yield put<Actions>({ type: 'FETCH_GAME', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchfetchGamesByStatus() {
  while (true) {
    try {
      const action: FetchGamesActions = yield take((a: Actions) => (a.type === 'FETCH_GAMES' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<FetchGamesData> = yield call(gameRequests.fetchGamesByStatus, action.payload.game_status);
      yield put<Actions>({ type: 'FETCH_GAMES', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_GAMES', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
