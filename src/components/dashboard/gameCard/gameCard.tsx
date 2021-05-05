import React from 'react';
import { withRouter } from 'react-router';
import './style.scss';

const GameCard = (props: any) => {
  return (
    <div>
      <p className='game-title regular-text'>Game {props.gameID}: {props.player1}({props.player1Rating}) vs {props.player2}({props.player2Rating})</p>
      <p className='regular-text'>{props.playerFavor} to win</p>
      <p className='regular-text'> Your earnings: ${props.earnings}</p>
    </div>
  );
};

export default withRouter(GameCard);
