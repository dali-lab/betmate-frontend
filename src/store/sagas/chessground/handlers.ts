/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select } from 'redux-saga/effects';
import { newMove, createNewArrows } from 'store/actionCreators/chessgroundActionCreators';
import { FetchGameActions, UpdateGameOddsActions, UpdateGameStateActions } from 'types/resources/game';
import { Actions, RootState } from 'types/state';

export function* handleNewGameState(action: FetchGameActions | UpdateGameStateActions) {
  if (action.status !== 'SUCCESS') return;

  const { state, move_hist: moveHist } = action.payload;
  yield put<Actions>(newMove(state, moveHist));
}

export function* handleNewGameOdds(action: FetchGameActions | UpdateGameOddsActions) {
  if (action.status !== 'SUCCESS') return;

  const gameId = action.type === 'FETCH_GAME'
    ? action.payload._id
    : action.payload.gameId;

  const { move } = action.payload.pool_wagers;
  const gameState: string = yield select((state: RootState) => state.game.games[gameId].state);

  yield put<Actions>(createNewArrows(gameState, move));
}
