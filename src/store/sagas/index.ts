import { spawn } from 'redux-saga/effects';

import gameSaga from 'store/sagas/game';
import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  try {
    yield spawn(gameSaga);
    yield spawn(watchSockets);
  } catch (error) {
    console.error(error);
  }
}

export default rootSaga;
