/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { gameOver, gameInProgress } from 'utils/chess';
import { GameStatus } from 'types/resources/game';
import './style.scss';

interface ChessMatchProps {
  icon: string,
  fen: string,
  name: string | undefined,
  elo: number | undefined,
  time: number | undefined,
  isBlack: boolean,
  gameStatus: GameStatus,
  updatedAt: string | undefined
}

const PlayerInfo: React.FC<ChessMatchProps> = (props) => {
  const [playerTime, setTime] = useState(0);
  const blackTurn = props.fen?.split(' ')[1] === 'b';
  const isGameOver = gameOver(props.gameStatus);
  const isGameInProgress = gameInProgress(props.gameStatus);
  const [timer, setTimer] = useState(setInterval(() => {}, 1000000));

  useEffect(() => { // Update timers
    const doDecrease = playerTime >= 0 && props.isBlack === blackTurn && isGameInProgress;
    const [decrease, interval] = (
      !doDecrease ? [0, 1000000]
        : playerTime >= 60 ? [1, 1000]
          : [0.1, 100]
    );

    clearInterval(timer);
    setTimer(setInterval(() => setTime((t) => t - decrease), interval));
  }, [blackTurn]);

  useEffect(() => {
    if (Math.round(playerTime) === 60) {
      const [decrease, interval] = [0.1, 100];
      clearInterval(timer);
      setTimer(setInterval(() => setTime((t) => t - decrease), interval));
    }
  }, [playerTime]);

  useEffect(() => { // Update time after every move
    if (props.fen) {
      const adjustment = playerTime === 0 && (props.isBlack === blackTurn) && isGameInProgress
        ? (new Date().getTime() - new Date(props.updatedAt ?? '').getTime()) / 1000
        : 0;

      setTime((time) => Math.round(((props.time ?? 0) + (time % 1) - adjustment) * 10) / 10);
    }
  }, [props.time, props.fen]);

  useEffect(() => {
    if (isGameOver) { // Clear timer when game is over
      clearInterval(timer);
    }
  }, [gameOver]);

  // Get timer format
  const getTimeString = (time: number): string => {
    const timeString = new Date((time ?? 0) * 1000).toISOString();

    if (time > 3600) { // Over an hour
      return timeString.substr(11, 8);
    } else if (time > 60) { // Over a minute
      return timeString.substr(14, 5);
    } else { // Less than a minute
      return timeString.substr(17, 4);
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
