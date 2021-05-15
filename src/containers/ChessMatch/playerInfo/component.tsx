import React from 'react';
import './style.scss';

interface ChessMatchProps {
  icon: string,
  name: string,
  elo: number,
  time: number,
  isBlack: boolean
}

const PlayerInfo: React.FC<ChessMatchProps> = (props) => {
  return (
    <div className='player-info'>
      <div className='player-title'>
        <img className='player-icon' src={props.icon}/>
        <div>
          <h3 className='player-name'>{props.name} </h3>
          <p className='player-name'>({props.elo})</p>
        </div>
      </div>
      <div className={props.isBlack ? 'time-rect black-rect' : 'time-rect white-rect'}>
        <h3 className='player-time'>{new Date(props.time * 1000).toISOString().substr(14, 8)}</h3>
      </div>
    </div>
  );
};

export default PlayerInfo;
