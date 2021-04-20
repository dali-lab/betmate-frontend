import { spawn } from 'redux-saga/effects';
import watchSockets from './sockets';
import wagerRoot from './wagers';

function* rootSaga() {
  try {
    yield spawn(watchSockets);
    yield spawn(wagerRoot);
  } catch (error) {
    console.error(error);
  }
}

export default rootSaga;
