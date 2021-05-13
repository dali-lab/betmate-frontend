import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss';

interface GameCardProps {
  gameID: string;
  player1: string;
  player1Rating: number;
  player2: string;
  player2Rating: number;
  playerFavor: string;
  earnings: number;
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const history = useHistory();
  return (
    <div className='game-card'>
      <p className='game-title regular-text'>
        {props.player1}({props.player1Rating}) vs {props.player2}({props.player2Rating})
      </p>
      <p className='regular-text'>{props.playerFavor} to win</p>
      <p className='regular-text'> Your earnings: ${props.earnings}</p>
      <button className='join-button' onClick={() => history.push(`/chess/${props.gameID}`)}>join game</button>
    </div>
  );
};

export default GameCard;
