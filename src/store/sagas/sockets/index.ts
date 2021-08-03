/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  call, take, fork, cancel, put,
} from 'redux-saga/effects';

import { io, Socket } from 'socket.io-client';

import { Actions } from 'types/state';
import { ROOT_URL } from 'utils';

import {
  errorHandler, joinAuthHandler, joinGameHandler, leaveAuthHandler, leaveGameHandler, updateGameStateHandler, updatePoolWagerHandler, updateWagerStateHandler,
} from './handlers';

const WS_URL = `${ROOT_URL}/chessws`;

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
      const socket: Socket = yield call(createSocket, WS_URL);

      yield put<Actions>({ type: 'INITIALIZE_SOCKET', status: 'SUCCESS', payload: { url: WS_URL } });

      // Open all forked processes
      const joinGameHandlerFork = yield fork(joinGameHandler, socket);
      const leaveGameHandlerFork = yield fork(leaveGameHandler, socket);
      const joinAuthHandlerFork = yield fork(joinAuthHandler, socket);
      const leaveAuthHandlerFork = yield fork(leaveAuthHandler, socket);
      const updateGameStateHandlerFork = yield fork(updateGameStateHandler, socket);
      const updateWagerStateHandlerFork = yield fork(updateWagerStateHandler, socket);
      const updatePoolWagerHandlerFork = yield fork(updatePoolWagerHandler, socket);
      const errorHandlerFork = yield fork(errorHandler, socket);

      yield take((a: Actions) => a.type === 'CLOSE_SOCKET');

      // Close all forked processes
      yield cancel(joinGameHandlerFork);
      yield cancel(leaveGameHandlerFork);
      yield cancel(joinAuthHandlerFork);
      yield cancel(leaveAuthHandlerFork);
      yield cancel(updateGameStateHandlerFork);
      yield cancel(updateWagerStateHandlerFork);
      yield cancel(updatePoolWagerHandlerFork);
      yield cancel(errorHandlerFork);

      // allow possible reconnection to socket
      yield take((a: Actions) => a.type === 'INITIALIZE_SOCKET' && a.status === 'REQUEST');
    }
  } catch (error) {
    console.error(error);
  }
}

export default watchSockets;
