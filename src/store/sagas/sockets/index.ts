/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  call, take, fork, cancel, put,
} from 'redux-saga/effects';

import { io, Socket } from 'socket.io-client';

import { Actions } from 'types/state';
import { ROOT_URL } from 'utils';

import {
  errorHandler, joinAuthHandler, joinGameHandler, leaveAuthHandler, leaveGameHandler, updateGameStateHandler,
} from './handlers';

const WS_URL = `${ROOT_URL}/chessws`;

/**
 * Function that creates and returns a websocket instance
 * @param address WS url to connect to
 * @returns websocket instance
 */
const createSocket = (address: string) => {
  // const token = localStorage.getItem('token');
  // return token
  //   ? io(address, { extraHeaders: { Authorization: `Bearer ${token}` } })
  //   : io(address);
  // // console.log('TOKEN', token);
  // // if (token) {
  // //   const parsed = JSON.parse(atob(token?.split('.')[1]));
  // //   console.log('parsed', parsed);
  // // }
  return io(address);
};

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
      const errorHandlerFork = yield fork(errorHandler, socket);

      // Attempt auth with token
      const token = localStorage.getItem('token');
      if (token) yield put<Actions>({ type: 'JOIN_AUTH', payload: { token }, status: 'REQUEST' });

      yield take((a: Actions) => a.type === 'CLOSE_SOCKET');

      // Close all forked processes
      yield cancel(joinGameHandlerFork);
      yield cancel(leaveGameHandlerFork);
      yield cancel(joinAuthHandlerFork);
      yield cancel(leaveAuthHandlerFork);
      yield cancel(updateGameStateHandlerFork);
      yield cancel(errorHandlerFork);

      // allow possible reconnection to socket
      yield take((a: Actions) => a.type === 'INITIALIZE_SOCKET' && a.status === 'REQUEST');
    }
  } catch (error) {
    console.error(error);
  }
}

export default watchSockets;
