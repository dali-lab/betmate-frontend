import { eventChannel } from 'redux-saga';
import {
  GameUpdateActions,
  UpdateGameEndData,
  UpdateGameOddsData, UpdateGameStateData,
} from 'types/resources/game';
import {
  ChannelCreator, SocketErrorData, Events, SocketErrorAction, SocketGameErrorAction, SocketGameErrorData,
} from 'types/socket';

/**
 * A function to create an event channel that listens for 'new_move' events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createUpdateGameStateChannel: ChannelCreator<GameUpdateActions> = (socket) => eventChannel(
  (pushToChannel) => {
    const newMoveHandler = (payload: UpdateGameStateData) => {
      pushToChannel({ type: 'UPDATE_GAME_STATE', status: 'SUCCESS', payload });
    };

    const newOddsHandler = (payload: UpdateGameOddsData) => {
      pushToChannel({ type: 'UPDATE_GAME_ODDS', status: 'SUCCESS', payload });
    };

    const newGameOverHandler = (payload: UpdateGameEndData) => {
      pushToChannel({ type: 'UPDATE_GAME_END', status: 'SUCCESS', payload });
    };

    socket.on<Events>('new_move', newMoveHandler);
    socket.on<Events>('wagers', newOddsHandler);
    socket.on<Events>('game_over', newGameOverHandler);

    return () => {
      socket.off('new_move', newMoveHandler);
      socket.off('wagers', newOddsHandler);
      socket.off('game_over', newGameOverHandler);
    };
  },
);

/**
 * A function to create an event channel that listens for 'error' events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createErrorChannel: ChannelCreator<SocketErrorAction | SocketGameErrorAction> = (socket) => eventChannel(
  (pushToChannel) => {
    const socketErrorHandler = (payload: SocketErrorData) => {
      pushToChannel({ type: 'SOCKET_ERROR', status: 'FAILURE', payload });
    };

    const gameErrorHandler = (payload: SocketGameErrorData) => {
      pushToChannel({ type: 'SOCKET_GAME_ERROR', status: 'FAILURE', payload });
    };

    socket.on<Events>('socket_error', socketErrorHandler);
    socket.on<Events>('game_error', gameErrorHandler);
    return () => { };
  },
);
