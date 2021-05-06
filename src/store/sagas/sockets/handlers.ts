/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EventChannel } from 'redux-saga';
import {
  call, put, take, apply,
} from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

import { JoinGameData, MakeMoveData, UpdateGameStateData } from 'types/resources/game';
import { Actions } from 'types/state';
import { SocketErrorData } from 'types/socket';

import { createErrorChannel, createUpdateGameStateChannel } from './channels';

/**
 * Saga that emits 'join_game' events onto the passed socket and completes the following:
 * - Waits for an event of type 'JOIN_GAME'
 * - Emits a 'join_game' socket event using the `socket.emit` method
 * - Dispatches success or failure based on if whether an error occurred
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* joinGameHandler(socket: Socket) {
  while (true) {
    try {
      const action: { payload: JoinGameData } = yield take((a: Actions) => a.type === 'JOIN_GAME' && a.status === 'REQUEST');
      yield apply(socket, socket.emit, ['join_game', action.payload.gameId]);
      yield put<Actions>({ type: 'JOIN_GAME', status: 'SUCCESS', payload: { gameId: action.payload.gameId } });
    } catch (error) {
      yield put<Actions>({ type: 'JOIN_GAME', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that emits 'make_move' events onto the passed socket and completes the following:
 * - Waits for an event of type 'MAKE_MOVE'
 * - Emits a 'make_move' socket event using the `socket.emit` method
 * - Dispatches success or failure based on if whether an error occurred
 * - Repeat
 * @param socket socket to watch for events on
 */
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

/**
 * Saga that watches for events on the created socketChannel and handles them in the following way:
 * - Waits for an event on the channel
 * - Dispatches the event to the redux store (or an error state if saga fails)
 * - Repeat
 * @param socket socket to watch for events on
 */
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

/**
 * Saga that watches for error events on the created socketChannel and handles them in the following way:
 * - Waits for an event on the channel
 * - Dispatches the event to the redux store (or an error state if saga fails)
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* errorHandler(socket: Socket) {
  const socketChannel: EventChannel<SocketErrorData> = yield call(createErrorChannel, socket);

  while (true) {
    try {
      const payload: SocketErrorData = yield take(socketChannel);
      yield put<Actions>({ type: 'SOCKET_ERROR', status: 'FAILURE', payload: { message: payload.message } });
    } catch (error) {
      yield put<Actions>({ type: 'SOCKET_ERROR', status: 'FAILURE', payload: { message: error.message } });
    }
  }
}
