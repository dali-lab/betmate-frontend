import { EventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';

import { Empty } from 'types';
import { Action } from 'types/state';

export type ClientEvents = 'join_game' | 'make_move';
export type ServerEvents = 'wagers' | 'new_move' | 'error';
export type Events = ClientEvents | ServerEvents;

export type ChannelCreator<T = unknown> = (socket: Socket) => EventChannel<T>;

/* -------- State -------- */

/* -------- Action Types -------- */

export const INITIALIZE_SOCKET = 'INITIALIZE_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';
export const SOCKET_ERROR = 'SOCKET_ERROR';

export type InitializeSocketData = { url: string };
export type SocketErrorData = { message: string };
export type CloseSocketData = Empty;

export type InitializeSocketAction = Action<typeof INITIALIZE_SOCKET, InitializeSocketData>;
export type ErrorAction = Action<typeof SOCKET_ERROR, SocketErrorData>;
export type CloseSocketAction = Action<typeof CLOSE_SOCKET, CloseSocketData>;

export type SocketActions = InitializeSocketAction | ErrorAction | CloseSocketAction;
export type SocketActionTypes = typeof INITIALIZE_SOCKET | typeof SOCKET_ERROR | typeof CLOSE_SOCKET;
