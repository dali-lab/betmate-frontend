/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';
import * as gameWatchers from 'store/sagas/game/watchers';

export default function* gameSaga() {
  yield fork(gameWatchers.watchFetchGameById);
  yield fork(gameWatchers.watchfetchGamesByStatus);
}
