import { eventChannel } from 'redux-saga';
import { UpdateGameStateData } from 'types/resources/game';
import { ChannelCreator, SocketErrorData, Events } from 'types/socket';

/**
 * A function to create an event channel that listens for 'new_move' events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createUpdateGameStateChannel: ChannelCreator<UpdateGameStateData> = (socket) => eventChannel(
  (pushToChannel) => {
    const newMoveHandler = (payload: UpdateGameStateData) => {
      pushToChannel(payload);
    };

    socket.on<Events>('new_move', newMoveHandler);
    return () => { };
  },
);

/**
 * A function to create an event channel that listens for 'error' events on the passed socket and pushes them to the created channel
 * @param socket socket to monitor for events on
 * @returns saga eventChannel creator function
 */
export const createErrorChannel: ChannelCreator<SocketErrorData> = (socket) => eventChannel(
  (pushToChannel) => {
    const errorHandler = (payload: SocketErrorData) => {
      pushToChannel(payload);
    };

    socket.on<Events>('error', errorHandler);
    return () => { };
  },
);
