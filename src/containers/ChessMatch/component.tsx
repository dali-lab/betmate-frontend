import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chessboard from 'chessboardjsx';
import './style.scss';
import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';

interface ChessMatchProps {
  joinGame: typeof joinGame
  leaveGame: typeof leaveGame
  fetchGameById: typeof fetchGameById
  games: Record<string, Game>
}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const [fen, updateFen] = useState('');

  useEffect(() => {
    props.fetchGameById(gameId);
    props.joinGame(gameId);
    return () => { props.leaveGame(gameId); };
  }, []);

  useEffect(() => {
    const game = props.games[gameId];
    if (game) updateFen(game.state);
  }, [props.games[gameId]?.state]);
  return (
    <>
      <NavBar />
      <div className='chess-match-container'>
        <div className="chat-container">
          <div className="chat-box">
            <h1>Chat</h1>
          </div>
        </div>
        <div>
          <div className='player-info'>
            <div>
              <h3 className='player-name'>{props.games[gameId].player_black.name} </h3>
              <p className='player-name'>({props.games[gameId].player_black.elo})</p>
            </div>

            <p className='player-time'>{new Date(props.games[gameId].time_black * 1000).toISOString().substr(14, 8)}</p>
            {console.log(props.games[gameId])}
          </div>
          <div className='chessBoard'>
            <Chessboard position={fen} width={700}/>
          </div>
          <div className='player-info'>
            <div>
              <h3 className='player-name'>{props.games[gameId].player_white.name} </h3>
              <p className='player-name'>({props.games[gameId].player_white.elo})</p>
            </div>

            <p className='player-time'>{new Date(props.games[gameId].time_white * 1000).toISOString().substr(14, 8)}</p>
            {console.log(props.games[gameId])}
          </div>
        </div>
        <WagerPanel/>
      </div>
    </>
  );
};

export default ChessMatch;
