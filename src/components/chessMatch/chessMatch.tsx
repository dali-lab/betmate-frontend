import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import './style.scss';

const chess = new Chess();

const ChessMatch = () => {
  const [fen, updateFen] = useState(chess.fen());

  const clicky = () => {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    updateFen(chess.fen());
  };
  return (
    <div className='chess-board'>
      <button onClick={() => clicky()}/>
      <Chessboard position={fen} />
    </div>
  );
};

export default ChessMatch;
