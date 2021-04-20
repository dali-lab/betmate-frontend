import {
  call, take, fork, cancel,
} from 'redux-saga/effects';

import { io, Socket } from 'socket.io-client';

import { errorHandler, makeMoveHandler, updateGameStateHandler } from './handlers';

import { Actions } from '../../../types/state';
import { InitializeSocketAction } from '../../../types/socket';

/**
 * Function that creates and returns a websocket instance
 * @param address WS url to connect to
 * @returns websocket instance
 */
const createSocket = (address: string) => io(address);

function* watchSockets() {
  try {
    while (true) {
      const action: InitializeSocketAction = yield take((a: Actions) => a.type === 'INITIALIZE_SOCKET');

      const socket: Socket = yield call(createSocket, action.payload.url);

      // Open all forked processes
      const makeMoveHandlerFork = yield fork(makeMoveHandler, socket);

      const updateGameStateHandlerFork = yield fork(updateGameStateHandler, socket);
      const errorHandlerFork = yield fork(errorHandler, socket);

      yield take((a: Actions) => a.type === 'CLOSE_SOCKET');

      // Close all forked processes
      yield cancel(makeMoveHandlerFork);
      yield cancel(updateGameStateHandlerFork);
      yield cancel(errorHandlerFork);
    }
  } catch (error) {
    console.error(error);
  }
}

export default watchSockets;
