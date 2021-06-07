import React, { useState, useEffect } from 'react';
import { GameStatus, gameOver, gameInProgress } from 'utils/chess';
import './style.scss';

interface ChessMatchProps {
  icon: string,
  fen: string,
  name: string | undefined,
  elo: number | undefined,
  time: number | undefined,
  isBlack: boolean,
  gameStatus: GameStatus
}

const PlayerInfo: React.FC<ChessMatchProps> = (props) => {
  const [playerTime, setTimer] = useState(props.time == null ? 0 : props.time);
  const blackTurn = props.fen?.split(' ')[1] === 'b';
  const isGameOver = gameOver(props.gameStatus);
  const isGameInProgress = gameInProgress(props.gameStatus);
  const [blackTimer, setBlackTimer] = useState(setInterval(() => {}, 0));
  const [whiteTimer, setWhiteTimer] = useState(setInterval(() => {}, 0));

  useEffect(() => { // Update timers
    const doDecrease = playerTime >= 0 && props.isBlack === blackTurn && isGameInProgress;
    const decrease = doDecrease ? 0.01 : 0;

    if (!blackTurn) { // Countdown white
      setWhiteTimer(setInterval(() => setTimer((time) => time - decrease), 10));
      clearInterval(blackTimer);
    } else { // Countdown black
      setBlackTimer(setInterval(() => setTimer((time) => time - decrease), 10));
      clearInterval(whiteTimer);
    }
  }, [blackTurn]);

  useEffect(() => { // Update time after every move
    setTimer((time) => Math.round(((props.time ?? 0) + (time % 1)) * 100) / 100);
  }, [props.time]);

  if (isGameOver) { // Clear timer when game is over
    clearInterval(blackTimer);
    clearInterval(whiteTimer);
  }

  // Get timer format
  const getTimeString = (time: number): string => {
    const timeString = new Date((time ?? 0) * 1000).toISOString();

    if (time > 3600) { // Over an hour
      return timeString.substr(11, 8);
    } else if (time > 60) { // Over a minute
      return timeString.substr(14, 5);
    } else { // Less than a minute
      return timeString.substr(17, 5);
    }
  };

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
        <h3 className='player-time'>{getTimeString(playerTime)}</h3>
      </div>
    </div>
  );
};

export default PlayerInfo;
