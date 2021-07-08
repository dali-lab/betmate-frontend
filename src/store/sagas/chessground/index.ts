/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';
import { watchNewGameOdds, watchNewGameState } from './watchers';

export default function* chessgroundSaga() {
  yield fork(watchNewGameState);
  yield fork(watchNewGameOdds);
}
