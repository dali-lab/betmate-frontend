import React, { useState, useEffect } from 'react';
import './style.scss';

interface ChessMatchProps {
  icon: string,
  fen: string,
  name: string | undefined,
  elo: number | undefined,
  time: number | undefined,
  isBlack: boolean
}

const PlayerInfo: React.FC<ChessMatchProps> = (props) => {
  // const playerTime = new Date((props.time ?? 0) * 1000).toISOString().substr(14, 8);
  // const playerTime = props.time;
  const [playerTime, setCounter] = useState(props.time == null ? 0 : props.time);
  const whiteTurn = props.fen?.split(' ')[1] === 'w';
  useEffect(() => {
    let decrease = 0;
    console.log(props.fen);
    // console.log(props.fen.split(' ')[1] === 'w');
    if (playerTime > 0 && (!props.isBlack && whiteTurn) && ()) decrease = 0.01;
    setInterval(() => setCounter((time) => time - decrease), 10);
    // return () => clearInterval(timer);
  }, [whiteTurn]);

  useEffect(() => {
    // console.log(playerTime);
  }, [playerTime]);

  const timeString = new Date((playerTime ?? 0) * 1000).toISOString();

  return (
    <div className='player-info'>
      <div className='player-title'>
        <img className='player-icon' src={props.icon}/>
        {/* {console.log(props.fen)} */}
        <div>
          <h3 className='player-name'>{props.name} </h3>
          <p className='player-name'>({props.elo})</p>
        </div>
      </div>
      <div className={props.isBlack ? 'time-rect black-rect' : 'time-rect white-rect'}>
        <h3 className='player-time'>{playerTime > 60 ? timeString.substr(11, 8) : timeString.substr(14, 8) }</h3>
      </div>
    </div>
  );
};

export default PlayerInfo;
