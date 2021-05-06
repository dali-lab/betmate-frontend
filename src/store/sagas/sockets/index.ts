/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  call, take, fork, cancel,
} from 'redux-saga/effects';

import { io, Socket } from 'socket.io-client';

import { InitializeSocketAction } from 'types/socket';
import { Actions } from 'types/state';

import {
  errorHandler, joinGameHandler, leaveGameHandler, makeMoveHandler, updateGameStateHandler,
} from './handlers';

/**
 * Function that creates and returns a websocket instance
 * @param address WS url to connect to
 * @returns websocket instance
 */
const createSocket = (address: string) => io(address);

/**
 * Saga that completes the following steps indefinitely:
 * - Wait for an action of type 'INITIALIZE_SOCKET'
 * - Create a socket connection based on passed config
 * - Start individual event channels to handle specific socket events
 * - Wait for an action of type 'CLOSE_SOCKET'
 * - Close socket and all handlers
 * - Repeat
 */
function* watchSockets() {
  try {
    while (true) {
      const action: InitializeSocketAction = yield take((a: Actions) => a.type === 'INITIALIZE_SOCKET');

      const socket: Socket = yield call(createSocket, action.payload.url);

      // Open all forked processes
      const joinGameHandlerFork = yield fork(joinGameHandler, socket);
      const leaveGameHandlerFork = yield fork(leaveGameHandler, socket);
      const makeMoveHandlerFork = yield fork(makeMoveHandler, socket);
      const updateGameStateHandlerFork = yield fork(updateGameStateHandler, socket);
      const errorHandlerFork = yield fork(errorHandler, socket);

      yield take((a: Actions) => a.type === 'CLOSE_SOCKET');

      // Close all forked processes
      yield cancel(joinGameHandlerFork);
      yield cancel(leaveGameHandlerFork);
      yield cancel(makeMoveHandlerFork);
      yield cancel(updateGameStateHandlerFork);
      yield cancel(errorHandlerFork);
    }
  } catch (error) {
    console.error(error);
  }
}

export default watchSockets;
