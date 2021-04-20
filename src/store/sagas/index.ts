import { spawn } from 'redux-saga/effects';
import watchSockets from 'store/sagas/sockets';

function* rootSaga() {
  try {
    yield spawn(watchSockets);
  } catch (error) {
    console.error(error);
  }
}

export default rootSaga;
