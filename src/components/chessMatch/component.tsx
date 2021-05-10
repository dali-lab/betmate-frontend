import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chessboard from 'chessboardjsx';
// import { Chess } from 'chess.js';
import './style.scss';
import { joinRoom, leaveRoom } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';

interface ChessMatchProps {
  joinGame: typeof joinRoom
  leaveGame: typeof leaveRoom
  fetchGameById: typeof fetchGameById
  games: Record<string, Game>
}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const [fen, updateFen] = useState('');

  useEffect(() => {
    console.log(gameId);
    props.fetchGameById(gameId);
    props.joinGame(gameId);
    return () => { props.leaveGame(gameId); };
  }, []);

  useEffect(() => {
    const game = props.games[gameId];
    if (game) updateFen(game.state);
  }, [props.games[gameId]?.state]);

  return (
    <div className='chess-board'>
      <Chessboard position={fen} />
    </div>
  );
};

export default ChessMatch;
