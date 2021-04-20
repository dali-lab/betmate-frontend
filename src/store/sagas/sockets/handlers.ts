import { EventChannel } from 'redux-saga';
import {
  call, put, take, apply,
} from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

import { createErrorChannel, createUpdateGameStateChannel } from 'store/sagas/sockets/channels';

import { MakeMoveData, UpdateGameStateData } from 'types/resources/game';
import { Actions } from 'types/state';
import { ErrorPayload } from 'types/socket';

export function* makeMoveHandler(socket: Socket) {
  while (true) {
    try {
      const action: { payload: MakeMoveData } = yield take((a: Actions) => a.type === 'MAKE_MOVE' && a.status === 'REQUEST');
      yield apply(socket, socket.emit, ['make_move', action.payload]);
      yield put<Actions>({ type: 'MAKE_MOVE', status: 'SUCCESS', payload: {} });
    } catch (error) {
      yield put<Actions>({ type: 'MAKE_MOVE', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

export function* updateGameStateHandler(socket: Socket) {
  const socketChannel: EventChannel<UpdateGameStateData> = yield call(createUpdateGameStateChannel, socket);

  while (true) {
    try {
      const payload: UpdateGameStateData = yield take(socketChannel);
      yield put<Actions>({ type: 'UPDATE_GAME_STATE', status: 'SUCCESS', payload });
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_GAME_STATE', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

// TODO: Update typing
export function* errorHandler(socket: Socket) {
  const socketChannel: EventChannel<ErrorPayload> = yield call(createErrorChannel, socket);

  while (true) {
    try {
      const payload = yield take(socketChannel);
      yield put({ type: 'REDUX_ERROR', payload: payload.messages });
    } catch (error) {
      yield put({ type: 'REDUX_ERROR', payload: { message: error.message } });
    }
  }
}
