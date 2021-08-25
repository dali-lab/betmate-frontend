/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { spawn } from 'redux-saga/effects';

import authSaga from 'store/sagas/auth';
import chessgroundSaga from 'store/sagas/chessground';
import gameSaga from 'store/sagas/game';
import wagerSaga from 'store/sagas/wager';
import leaderboardSaga from 'store/sagas/leaderboard';
import heapSaga from 'store/sagas/heap';

import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(chessgroundSaga);
  yield spawn(gameSaga);
  yield spawn(heapSaga);
  yield spawn(leaderboardSaga);
  yield spawn(wagerSaga);
  yield spawn(watchSockets);
}

export default rootSaga;
