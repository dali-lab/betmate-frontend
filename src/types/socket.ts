/* eslint-disable import/no-cycle */
import { EventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';

import { Empty } from 'types';
import { Action, AsyncAction } from 'types/state';

export type ClientEvents =
    'join_game' | 'leave_game' | 'join_auth' | 'leave_auth' | 'pool_wager' | 'game_chat';
export type ServerEvents =
    'start_game' | 'new_odds' | 'new_move' | 'game_over' | 'wager_result' | 'pool_wager' |
    'game_chat' | 'socket_error' | 'game_error';
export type Events = ClientEvents | ServerEvents;

export type ChannelCreator<T = unknown> = (socket: Socket) => EventChannel<T>;

/* -------- State -------- */

/* -------- Action Types -------- */

export const INITIALIZE_SOCKET = 'INITIALIZE_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SOCKET_GAME_ERROR = 'SOCKET_GAME_ERROR';
export const JOIN_AUTH = 'JOIN_AUTH';
export const LEAVE_AUTH = 'LEAVE_AUTH';

export type InitializeSocketData = { url: string };
export type SocketErrorData = { message: string };
export type SocketGameErrorData = { gameId: string, message: string };
export type CloseSocketData = Empty;
export type JoinAuthData = { token: string };
export type LeaveAuthData = { token: string };

export type InitializeSocketAction = Action<typeof INITIALIZE_SOCKET, InitializeSocketData>;
export type SocketErrorAction = Action<typeof SOCKET_ERROR, SocketErrorData>;
export type SocketGameErrorAction = Action<typeof SOCKET_GAME_ERROR, SocketGameErrorData>;
export type CloseSocketAction = Action<typeof CLOSE_SOCKET, CloseSocketData>;
export type JoinAuthActions = AsyncAction<typeof JOIN_AUTH, JoinAuthData, JoinAuthData>;
export type LeaveAuthActions = AsyncAction<typeof LEAVE_AUTH, LeaveAuthData, LeaveAuthData>;

export type SocketActions = InitializeSocketAction | SocketErrorAction | SocketGameErrorAction | CloseSocketAction | JoinAuthActions | LeaveAuthActions;
export type SocketActionTypes = typeof INITIALIZE_SOCKET | typeof SOCKET_ERROR | typeof SOCKET_GAME_ERROR | typeof CLOSE_SOCKET | typeof JOIN_AUTH | typeof LEAVE_AUTH;
