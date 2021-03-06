/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EventChannel } from 'redux-saga';
import {
  call, put, take, apply, select,
} from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

import {
  BroadcastPoolWager, BroadcastPoolWagerActions, GameChatActions, GameUpdateActions, JoinGameData, LeaveGameData,
} from 'types/resources/game';
import { Actions, RootState } from 'types/state';
import {
  SocketErrorAction, SocketGameErrorAction,
} from 'types/socket';

import { CreateWagerActions, FetchWagersActions } from 'types/resources/wager';
import { getBearerToken, removeBearerToken } from 'store/actionCreators';
import { User } from 'types/resources/auth';
import {
  createErrorChannel, createGameChatChannel, createUpdateGameStateChannel, createUpdateWagerStateChannel,
} from './channels';

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
 * Saga that emits 'leave_game' events onto the passed socket and completes the following:
 * - Waits for an event of type 'LEAVE_GAME'
 * - Emits a 'leave_game' socket event using the `socket.emit` method
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
 * Saga that watches for events on the game-update socket channel and handles them in the following way:
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
 * Saga that watches for events on the update-wagers socket channel and handles them in the following way:
 * - Waits for an event on the channel
 * - Dispatches the event to the redux store (or an error state if saga fails)
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* updateWagerStateHandler(socket: Socket) {
  const socketChannel: EventChannel<FetchWagersActions | BroadcastPoolWagerActions> = yield call(createUpdateWagerStateChannel, socket);

  while (true) {
    try {
      const action: FetchWagersActions | BroadcastPoolWagerActions = yield take(socketChannel);
      yield put<Actions>(action);
      if (action.type === 'FETCH_WAGERS') yield put<Actions>({ type: 'JWT_SIGN_IN', status: 'REQUEST', payload: { token: getBearerToken() || '' } });
    } catch (error) {
      yield put<Actions>({ type: 'FETCH_WAGERS', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that watches for successful pool wagers and handles them in the following way:
 * - Waits for a successful wager action
 * - Check if it is a pool wager
 * - If so, send to websocket on 'pool_wager' channel
 * - Repeat
 * @param socket socket to watch for events on
 */
export function* updatePoolWagerHandler(socket: Socket) {
  while (true) {
    try {
      const action: CreateWagerActions = yield take((a: Actions) => a.type === 'CREATE_WAGER' && a.status === 'SUCCESS');
      if (action.status !== 'SUCCESS') continue;
      if (action.payload.wdl) continue;

      const { game_id: gameId, data, amount } = action.payload;
      const message: BroadcastPoolWager = {
        gameId, type: 'move', data, amount,
      };
      yield apply(socket, socket.emit, ['pool_wager', message]);
      yield put<Actions>({ type: 'BROADCAST_POOL_WAGER', status: 'SUCCESS', payload: message });
    } catch (error) {
      yield put<Actions>({ type: 'BROADCAST_POOL_WAGER', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

/**
 * Saga that listens for successful auth-related events and handles them in the following way:
 * - Waits for a successful auth event of type CREATE_USER, SIGN_IN_USER, or JWT_SIGN_IN
 * - Gets the saved JWT token
 * - Emits a 'join_auth' socket event using the `socket.emit` method with the JWT
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
 * Saga that listens for deauth events and completes the following:
 * - Waits for an event of type 'DEAUTH_USER'
 * - Gets the saved JWT, then removes it from local storage
 * - Emits a 'leave_auth' socket event using the `socket.emit` method
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

export function* sendGameMessageHandler(socket: Socket) {
  while (true) {
    try {
      const action: GameChatActions = yield take((a: Actions) => a.type === 'GAME_CHAT' && a.status === 'REQUEST');
      if (action.status !== 'REQUEST') return;
      const user: User = yield select((state: RootState) => state.auth.user);
      if (!user) throw new Error('User not authenticated');
      const message = { ...action.payload, userId: user._id, userName: user.full_name };
      yield apply(socket, socket.emit, ['game_chat', message]);
      yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: message });
    } catch (error) {
      yield put<Actions>({ type: 'GAME_CHAT', status: 'FAILURE', payload: { message: error.message, code: null } });
    }
  }
}

export function* receiveGameMessageHandler(socket: Socket) {
  const socketChannel: EventChannel<GameChatActions> = yield call(createGameChatChannel, socket);

  while (true) {
    try {
      const action: GameChatActions = yield take(socketChannel);
      yield put<Actions>(action);
    } catch (error) {
      yield put<Actions>({ type: 'GAME_CHAT', status: 'FAILURE', payload: { message: error.message, code: null } });
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
