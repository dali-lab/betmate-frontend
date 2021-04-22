import { fork } from 'redux-saga/effects';
import * as wagerWatchers from 'store/sagas/wager/watchers';

export default function* wagerSaga() {
  yield fork(wagerWatchers.watchCreateWager);
  yield fork(wagerWatchers.watchFetchWagerById);
  yield fork(wagerWatchers.watchUpdateWagerById);
  yield fork(wagerWatchers.watchDeleteWagerById);
}
