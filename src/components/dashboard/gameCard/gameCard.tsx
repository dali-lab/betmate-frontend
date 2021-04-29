import React from 'react';
import './gameCard.scss';

const GameCard = (props) => {
  return (
    <div>
      <p className='game-title regular-text'>Game {props.gameID}: {props.player1}({props.player1Rating}) vs {props.player2}({props.player2Rating})</p>
      <p className='regular-text'>{props.playerFavor} to win</p>
      <p className='regular-text'> Your earnings: ${props.earnings}</p>
    </div>
  );
};

export default GameCard;
