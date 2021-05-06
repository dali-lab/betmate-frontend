/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';
import * as authWatchers from 'store/sagas/auth/watchers';

export default function* authSaga() {
  yield fork(authWatchers.watchSignInUser);
  yield fork(authWatchers.watchCreateUser);
}
