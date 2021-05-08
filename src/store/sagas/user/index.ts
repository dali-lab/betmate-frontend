/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';
import * as userWatchers from 'store/sagas/user/watchers';

export default function* userSaga() {
  yield fork(userWatchers.watchFetchUserById);
  yield fork(userWatchers.watchUpdateUserById);
  yield fork(userWatchers.watchDeleteUserById);
}
