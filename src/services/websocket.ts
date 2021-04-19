import io from 'socket.io-client';

const socket = io('http://localhost:9090/chessws');

export const joinRoom = (roomID: string): void => {
  socket.emit('join_room', roomID);
};

export const initializeSocket = (callback) => {
  socket.on('error', (payload) => {
    callback(payload);
  });

  socket.on('new_move', (payload) => {
    callback(payload);
  });
};

export default socket;
