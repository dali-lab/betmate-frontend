import React from 'react';
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import './chessMatch.scss';

const ChessMatch = (props) => {
  return (
    <div className='chess-board'>
      <Chessground />
    </div>
  );
};

export default ChessMatch;
