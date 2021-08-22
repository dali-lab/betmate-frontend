import React from 'react';
import { useHistory } from 'react-router-dom';
import { WDLBar } from 'components/WagerPanel/helper_components';

import blackPawn from 'assets/dashboard/blackPawn.svg';
import whitePawn from 'assets/dashboard/whitePawn.svg';

import './style.scss';
import { Game } from 'types/resources/game';

interface GameCardProps {
  game: Game
  topGame?: boolean
}

const GameCard: React.FC<GameCardProps> = (props) => {
  const history = useHistory();
  return (
    <div className='game-card'>
      <div className='game-title'>
        <img src={blackPawn} width={props.topGame ? 150 : 100} />
        <div className='game-title regular-text'>
          <div className='game-title-small'>
            <p className='player-name-whole player-title'>{props.game.player_black.name}</p>
            <p className='player-title'>({props.game.player_black.elo})</p>
          </div>
          <p className='vs-text'>vs</p>
          <div className='game-title-small'>
            <p className='player-name-whole player-title'
              // style={{
              //   width: '80px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'block',
              // }}
            >{props.game.player_white.name}</p>
            <p className='player-title'>({props.game.player_white.elo})</p>
          </div>
        </div>
        <img src={whitePawn} width={props.topGame ? 150 : 100} />
      </div>
      <div className='wdl-bar'>
        <WDLBar
          odds={props.game.odds}
          height={props.topGame ? 30 : 15}
          width={props.topGame ? 750 : 300}
        />
      </div>

      <button className='join-button' onClick={() => history.push(`/chess/${props.game._id}`)}>join game</button>
    </div>
  );
};

export default GameCard;
