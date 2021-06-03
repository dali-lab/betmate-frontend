import React, { useState, useEffect } from 'react';
import './style.scss';

interface ChessMatchProps {
  icon: string,
  fen: string,
  name: string | undefined,
  elo: number | undefined,
  time: number | undefined,
  isBlack: boolean,
  gameOver: boolean
}

const PlayerInfo: React.FC<ChessMatchProps> = (props) => {
  const [playerTime, setTimer] = useState(props.time == null ? 0 : props.time);
  const blackTurn = props.fen?.split(' ')[1] === 'b';
  const [blackTimer, setBlackTimer] = useState(0);
  const [whiteTimer, setWhiteTimer] = useState(0);

  useEffect(() => {
    let decrease = 0;
    if (playerTime >= 0 && (props.isBlack === blackTurn)) {
      decrease = 0.01;
    }
    if (!blackTurn) {
      setWhiteTimer(setInterval(() => setTimer((time) => time - decrease), 10) as unknown as number);
      clearInterval(blackTimer);
    } else {
      setBlackTimer(setInterval(() => setTimer((time) => time - decrease), 10) as unknown as number);
      clearInterval(whiteTimer);
    }
  }, [blackTurn]);

  if (props.gameOver) { // Clear timer when game is over
    clearInterval(blackTimer);
    clearInterval(whiteTimer);
  }
  const timeString = new Date((playerTime ?? 0) * 1000).toISOString();

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
        <h3 className='player-time'>{playerTime > 60 ? timeString.substr(11, 8) : timeString.substr(14, 8) }</h3>
      </div>
    </div>
  );
};

export default PlayerInfo;
