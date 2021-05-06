import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Chessboard from 'chessboardjsx';
// import { Chess } from 'chess.js';
import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chess = require('chess.js');

const chess = new Chess();

interface ChessMatchProps extends RouteComponentProps<{ id: string }> {}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const [fen, updateFen] = useState(chess.fen());

  useEffect(() => {
    console.log(props.match.params.id);
  });

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
