/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import 'react-chessground/dist/styles/chessground.css';
import './chessMatch.scss';
import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
const Chess = require('chess.js');

const chess = new Chess();

const ChessMatch = () => {
  const [fen, updateFen] = useState('');
  const clicky = () => {
    const moves = chess.moves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    // console.log(chess.fen());
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
