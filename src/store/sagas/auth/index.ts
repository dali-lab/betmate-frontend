import { fork } from 'redux-saga/effects';
import * as authWatchers from 'store/sagas/auth/watchers';

export default function* authSaga() {
  yield fork(authWatchers.watchAuthUser);
}
