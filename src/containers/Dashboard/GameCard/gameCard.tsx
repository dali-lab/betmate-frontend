import React from 'react';
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
  return (
    <div>
      <p className='game-title regular-text'>Game {props.gameID}: {props.player1}({props.player1Rating}) vs {props.player2}({props.player2Rating})</p>
      <p className='regular-text'>{props.playerFavor} to win</p>
      <p className='regular-text'> Your earnings: ${props.earnings}</p>
    </div>
  );
};

export default GameCard;
