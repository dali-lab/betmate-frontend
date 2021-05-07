import { JoinGameActions, LeaveGameActions } from 'types/resources/game';
import { CloseSocketAction, InitializeSocketAction } from 'types/socket';

export const initializeSocket = (url: string): InitializeSocketAction => ({
  type: 'INITIALIZE_SOCKET',
  status: 'REQUEST',
  payload: { url },
});

export const closeSocket = (): CloseSocketAction => ({
  type: 'CLOSE_SOCKET',
  status: 'REQUEST',
  payload: {},
});

export const joinGame = (gameId: string): JoinGameActions => ({
  type: 'JOIN_GAME',
  status: 'REQUEST',
  payload: { gameId },
});

export const leaveGame = (gameId: string): LeaveGameActions => ({
  type: 'LEAVE_GAME',
  status: 'REQUEST',
  payload: { gameId },
});
