/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, take, put } from 'redux-saga/effects';

import * as wagerRequests from 'store/requests/wagerRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';

import {
  FetchWagerData,
  CreateWagerActions,
  FetchWagerActions,
  FetchWagersActions,
  FetchWagersData,
} from 'types/resources/wager';

export function* watchCreateWager() {
  while (true) {
    try {
      const action: CreateWagerActions = yield take((a: Actions) => (a.type === 'CREATE_WAGER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') continue; // Type protection only

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
      if (action.status !== 'REQUEST') continue; // Type protection only

      const response: RequestReturnType<FetchWagerData> = yield call(wagerRequests.fetchWagerById, action.payload.id);
      yield put<Actions>({ type: 'FETCH_WAGER', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_WAGER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}

export function* watchFetchWagers() {
  while (true) {
    try {
      const action: FetchWagersActions = yield take((a: Actions) => (a.type === 'FETCH_WAGERS' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchWagersData> = yield call(wagerRequests.fetchWagers);
      yield put<Actions>({ type: 'FETCH_WAGERS', payload: response.data, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_WAGERS', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
