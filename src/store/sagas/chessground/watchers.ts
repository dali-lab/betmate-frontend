/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select, takeEvery } from 'redux-saga/effects';
import { newMove, createNewArrows } from 'store/actionCreators/chessgroundActionCreators';
import { FetchGameActions, UpdateGameOddsActions, UpdateGameStateActions } from 'types/resources/game';
import { Actions, RootState } from 'types/state';

function* handleNewGameState(action: FetchGameActions | UpdateGameStateActions) {
  if (action.status !== 'SUCCESS') return;
  yield put<Actions>(newMove(action.payload.state, action.payload.move_hist));
}

function* handlerNewGameOdds(action: FetchGameActions | UpdateGameOddsActions) {
  if (action.status !== 'SUCCESS') return;
  const gameId = action.type === 'FETCH_GAME'
    ? action.payload._id
    : action.payload.gameId;
  const gameState = yield select((state: RootState) => state.game.games[gameId].state);

  yield put<Actions>(createNewArrows(gameState, action.payload.pool_wagers.move));
}

export function* watchNewGameState() {
  yield takeEvery((a: Actions) => (
    a.status === 'SUCCESS' && ['FETCH_GAME', 'UPDATE_GAME_STATE'].includes(a.type)
  ), handleNewGameState);
}

export function* watchNewGameOdds() {
  yield takeEvery((a: Actions) => (
    a.status === 'SUCCESS' && ['FETCH_GAME', 'UPDATE_GAME_ODDS'].includes(a.type)
  ), handlerNewGameOdds);
}
