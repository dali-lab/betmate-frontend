import { spawn } from 'redux-saga/effects';

import authSaga from 'store/sagas/auth';
import gameSaga from 'store/sagas/game';
import userSaga from 'store/sagas/user';
import wagerSaga from 'store/sagas/wager';

import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  try {
    yield spawn(authSaga);
    yield spawn(gameSaga);
    yield spawn(userSaga);
    yield spawn(wagerSaga);

    yield spawn(watchSockets);
  } catch (error) {
    console.error(error);
  }
}

export default rootSaga;
