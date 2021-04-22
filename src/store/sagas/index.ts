import { spawn } from 'redux-saga/effects';

import authSaga from 'store/sagas/auth';
import gameSaga from 'store/sagas/game';
import userSaga from 'store/sagas/user';
import wagerSaga from 'store/sagas/wager';

import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(gameSaga);
  yield spawn(userSaga);
  yield spawn(wagerSaga);

  yield spawn(watchSockets);
}

export default rootSaga;
