import React from 'react';
import { useHistory } from 'react-router-dom';
import blackPawn from 'assets/dashboard/blackPawn.svg';
import whitePawn from 'assets/dashboard/whitePawn.svg';

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
      <div className='game-title'>
        <img src={blackPawn}/>
        <div className='game-title regular-text'>
          <div className='game-title-small'>
            <p className='player-name-whole player-title'>{props.player1}</p>
            <p className='player-title'>({props.player1Rating})</p>
          </div>
          <p className='vs-text'>vs</p>
          <div className='game-title-small'>
            <p className='player-name-whole player-title'>{props.player2}</p>
            <p className='player-title'>({props.player2Rating})</p>
          </div>
        </div>
        <img src={whitePawn}/>
      </div>
      <p className='regular-text'>{props.playerFavor} to win</p>
      <button className='join-button' onClick={() => history.push(`/chess/${props.gameID}`)}>join game</button>
    </div>
  );
};

export default GameCard;
