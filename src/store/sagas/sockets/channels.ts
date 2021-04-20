import { eventChannel } from 'redux-saga';
import { UpdateGameStateData } from 'types/resources/game';
import { ChannelCreator, ErrorPayload, Events } from 'types/socket';

export const createUpdateGameStateChannel: ChannelCreator<UpdateGameStateData> = (socket) => eventChannel(
  (pushToChannel) => {
    const newMoveHandler = (payload: UpdateGameStateData) => {
      pushToChannel(payload);
    };

    socket.on<Events>('new_move', newMoveHandler);
    return () => { };
  },
);

export const createErrorChannel: ChannelCreator<ErrorPayload> = (socket) => eventChannel(
  (pushToChannel) => {
    const errorHandler = (payload: ErrorPayload) => {
      pushToChannel(payload);
    };

    socket.on<Events>('error', errorHandler);
    return () => { };
  },
);
