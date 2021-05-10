/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EventChannel } from 'redux-saga';
import {
  call, put, take, apply,
} from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

import { GameUpdateActions, JoinGameData, LeaveGameData } from 'types/resources/game';
import { Actions } from 'types/state';
import {
  SocketErrorAction, SocketGameErrorAction,
} from 'types/socket';

import { FetchWagersActions } from 'types/resources/wager';
import { getBearerToken, removeBearerToken } from 'store/actionCreators';
import { createErrorChannel, createUpdateGameStateChannel, createUpdateWagerStateChannel } from './channels';

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
      yield apply(console, console.log, ['ayo', action.payload.gameId]);
      yield apply(socket, socket.emit, ['join_game', action.payload.gameId]);
      yield put<Actions>({ type: 'JOIN_GAME', status: 'SUCCESS', payload: { gameId: action.payload.gameId } });
    } catch (error) {
      yield put<Actions>({ type: 'JOIN_GAME', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that emits 'join_game' events onto the passed socket and completes the following:
 * - Waits for an event of type 'JOIN_GAME'
 * - Emits a 'join_game' socket event using the `socket.emit` method
 * - Dispatches success or failure based on if whether an error occurred
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* leaveGameHandler(socket: Socket) {
  while (true) {
    try {
      const action: { payload: LeaveGameData } = yield take((a: Actions) => a.type === 'LEAVE_GAME' && a.status === 'REQUEST');
      yield apply(socket, socket.emit, ['leave_game', action.payload.gameId]);
      yield put<Actions>({ type: 'LEAVE_GAME', status: 'SUCCESS', payload: { gameId: action.payload.gameId } });
    } catch (error) {
      yield put<Actions>({ type: 'LEAVE_GAME', status: 'FAILURE', payload: { message: error.message, code: null } });
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
  const socketChannel: EventChannel<GameUpdateActions> = yield call(createUpdateGameStateChannel, socket);

  while (true) {
    try {
      const action: GameUpdateActions = yield take(socketChannel);
      yield put<Actions>(action);
    } catch (error) {
      yield put<Actions>({ type: 'UPDATE_GAME_STATE', status: 'FAILURE', payload: { message: error.message, code: null } });
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
export function* updateWagerStateHandler(socket: Socket) {
  const socketChannel: EventChannel<FetchWagersActions> = yield call(createUpdateWagerStateChannel, socket);

  while (true) {
    try {
      const action: FetchWagersActions = yield take(socketChannel);
      yield put<Actions>(action);
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_WAGERS', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that emits 'join_auth' events onto the passed socket and completes the following:
 * - Waits for an event of type 'JOIN_AUTH'
 * - Emits a 'join_auth' socket event using the `socket.emit` method
 * - Dispatches success or failure based on if whether an error occurred
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* joinAuthHandler(socket: Socket) {
  const authActions = ['CREATE_USER', 'SIGN_IN_USER', 'JWT_SIGN_IN'];
  while (true) {
    try {
      yield take((a: Actions) => authActions.includes(a.type) && a.status === 'SUCCESS');
      const token = yield call(getBearerToken);
      yield apply(socket, socket.emit, ['join_auth', token]);
      yield put<Actions>({ type: 'JOIN_AUTH', status: 'SUCCESS', payload: { token } });
    } catch (error) {
      yield put<Actions>({ type: 'JOIN_AUTH', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that emits 'join_auth' events onto the passed socket and completes the following:
 * - Waits for an event of type 'JOIN_AUTH'
 * - Emits a 'join_auth' socket event using the `socket.emit` method
 * - Dispatches success or failure based on if whether an error occurred
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* leaveAuthHandler(socket: Socket) {
  while (true) {
    try {
      yield take((a: Actions) => a.type === 'DEAUTH_USER' && a.status === 'SUCCESS');

      const token = yield call(getBearerToken);
      if (token) yield call(removeBearerToken);
      yield apply(socket, socket.emit, ['leave_auth', token]);
      yield put<Actions>({ type: 'LEAVE_AUTH', status: 'SUCCESS', payload: { token } });
    } catch (error) {
      yield put<Actions>({ type: 'LEAVE_AUTH', status: 'FAILURE', payload: { message: error.message, code: null } });
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
  const socketChannel: EventChannel<SocketErrorAction | SocketGameErrorAction> = yield call(createErrorChannel, socket);

  while (true) {
    try {
      const action: SocketErrorAction | SocketGameErrorAction = yield take(socketChannel);
      yield put<Actions>(action);
    } catch (error) {
      yield put<Actions>({ type: 'SOCKET_ERROR', status: 'FAILURE', payload: { message: error.message } });
    }
  }
}
