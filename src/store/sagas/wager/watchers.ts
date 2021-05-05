import { call, take, put } from 'redux-saga/effects';

import * as wagerRequests from 'store/requests/wagerRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';

import {
  FetchWagerData,
  CreateWagerActions, FetchWagerActions, UpdateWagerActions, DeleteWagerActions,
} from 'types/resources/wager';

export function* watchCreateWager() {
  while (true) {
    try {
      const action: CreateWagerActions = yield take((a: Actions) => (a.type === 'CREATE_WAGER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchWagerData> = yield call(
        wagerRequests.createWager,
        action.payload.gameId,
        action.payload.wager,
        action.payload.amount,
        action.payload.wdl,
        action.payload.odds,
        action.payload.moveNumber,
      );
      yield put<Actions>({ type: 'CREATE_WAGER', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_WAGER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchFetchWagerById() {
  while (true) {
    try {
      const action: FetchWagerActions = yield take((a: Actions) => (a.type === 'FETCH_WAGER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchWagerData> = yield call(wagerRequests.fetchWagerById, action.payload.id);
      yield put<Actions>({ type: 'FETCH_WAGER', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_WAGER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchUpdateWagerById() {
  while (true) {
    try {
      const action: UpdateWagerActions = yield take((a: Actions) => (a.type === 'UPDATE_WAGER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchWagerData> = yield call(wagerRequests.updateWagerById, action.payload.id, action.payload.fields);
      yield put<Actions>({ type: 'UPDATE_WAGER', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_WAGER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchDeleteWagerById() {
  while (true) {
    try {
      const action: DeleteWagerActions = yield take((a: Actions) => (a.type === 'DELETE_WAGER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      yield call(wagerRequests.deleteWagerById, action.payload.id);
      yield put<Actions>({ type: 'DELETE_WAGER', payload: { id: action.payload.id }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'DELETE_WAGER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
