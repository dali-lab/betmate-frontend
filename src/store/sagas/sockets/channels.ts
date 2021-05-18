import { eventChannel } from 'redux-saga';
import {
  BroadcastPoolWager,
  BroadcastPoolWagerActions,
  GameUpdateActions,
  StartGameData,
  UpdateGameEndData,
  UpdateGameOddsData, UpdateGameStateData,
} from 'types/resources/game';
import { FetchWagersActions, WagerResultData } from 'types/resources/wager';
import {
  ChannelCreator, SocketErrorData, Events, SocketErrorAction, SocketGameErrorAction, SocketGameErrorData,
} from 'types/socket';

/**
 * A function to create an event channel that listens for game related events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createUpdateGameStateChannel: ChannelCreator<GameUpdateActions> = (socket) => eventChannel(
  (pushToChannel) => {
    const gameStartHandler = (payload: StartGameData) => {
      pushToChannel({ type: 'START_GAME', status: 'SUCCESS', payload });
    };

    const newMoveHandler = (payload: UpdateGameStateData) => {
      pushToChannel({ type: 'UPDATE_GAME_STATE', status: 'SUCCESS', payload });
    };

    const newOddsHandler = (payload: UpdateGameOddsData) => {
      pushToChannel({ type: 'UPDATE_GAME_ODDS', status: 'SUCCESS', payload });
    };

    const gameOverHandler = (payload: UpdateGameEndData) => {
      pushToChannel({ type: 'UPDATE_GAME_END', status: 'SUCCESS', payload });
    };

    socket.on<Events>('start_game', gameStartHandler);
    socket.on<Events>('new_move', newMoveHandler);
    socket.on<Events>('new_odds', newOddsHandler);
    socket.on<Events>('game_over', gameOverHandler);

    return () => {
      socket.off('new_move', newMoveHandler);
      socket.off('wagers', newOddsHandler);
      socket.off('game_over', gameOverHandler);
    };
  },
);

/**
 * A function to create an event channel that listens for wager related events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createUpdateWagerStateChannel: ChannelCreator<FetchWagersActions | BroadcastPoolWagerActions> = (socket) => eventChannel(
  (pushToChannel) => {
    const wagerResultHandler = (payload: WagerResultData) => {
      const { wagers } = payload;
      pushToChannel({ type: 'FETCH_WAGERS', status: 'SUCCESS', payload: wagers });
    };
    const poolWagerHandler = (payload: BroadcastPoolWager) => {
      pushToChannel({ type: 'BROADCAST_POOL_WAGER', status: 'SUCCESS', payload });
    };

    socket.on<Events>('wager_result', wagerResultHandler);
    socket.on<Events>('pool_wager', poolWagerHandler);

    return () => {
      socket.off('wager_result', wagerResultHandler);
      socket.off('pool_wager', poolWagerHandler);
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
