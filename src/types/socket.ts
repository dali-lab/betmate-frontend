import { EventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';
import { Empty } from '.';
import { Action } from './state';

export type ClientEvents = 'join_game' | 'make_move';
export type ServerEvents = 'wagers' | 'new_move' | 'error';
export type Events = ClientEvents | ServerEvents;

export type ErrorPayload = { messages: string | string[] };

export type ChannelCreator<T = unknown> = (socket: Socket) => EventChannel<T>;

/* -------- State -------- */

/* -------- Action Types -------- */

export const INITIALIZE_SOCKET = 'INITIALIZE_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';

export type InitializeSocketData = { url: string };
export type CloseSocketData = Empty;

export type InitializeSocketAction = Action<typeof INITIALIZE_SOCKET, InitializeSocketData>;
export type CloseSocketAction = Action<typeof CLOSE_SOCKET, CloseSocketData>;

export type SocketActions = InitializeSocketAction | CloseSocketAction;
export type SocketActionTypes = typeof INITIALIZE_SOCKET | typeof CLOSE_SOCKET;
