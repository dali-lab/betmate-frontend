/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { spawn } from 'redux-saga/effects';

import authSaga from 'store/sagas/auth';
import chessgroundSaga from 'store/sagas/chessground';
import gameSaga from 'store/sagas/game';
import userSaga from 'store/sagas/user';
import wagerSaga from 'store/sagas/wager';

import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(chessgroundSaga);
  yield spawn(gameSaga);
  yield spawn(userSaga);
  yield spawn(wagerSaga);

  yield spawn(watchSockets);
}

export default rootSaga;
