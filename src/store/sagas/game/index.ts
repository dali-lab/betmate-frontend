import { fork } from 'redux-saga/effects';
import * as gameWatchers from 'store/sagas/game/watchers';

export default function* gameSaga() {
  yield fork(gameWatchers.watchCreateGame);
  yield fork(gameWatchers.watchFetchGameById);
  yield fork(gameWatchers.watchFetchGames);
  yield fork(gameWatchers.watchUpdateGameById);
  yield fork(gameWatchers.watchDeleteGameById);
}
