/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from 'types/state';
import { handleNewGameOdds, handleNewGameState } from './handlers';

export default function* chessgroundSaga() {
  yield takeEvery<ActionTypes[]>(['FETCH_GAME', 'UPDATE_GAME_STATE'], handleNewGameState);
  yield takeEvery<ActionTypes[]>(['FETCH_GAME', 'UPDATE_GAME_ODDS'], handleNewGameOdds);
}
