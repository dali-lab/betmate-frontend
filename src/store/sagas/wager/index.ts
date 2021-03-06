/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';
import * as wagerWatchers from 'store/sagas/wager/watchers';

export default function* wagerSaga() {
  yield fork(wagerWatchers.watchCreateWager);
  yield fork(wagerWatchers.watchFetchWagerById);
  yield fork(wagerWatchers.watchFetchWagers);
}
