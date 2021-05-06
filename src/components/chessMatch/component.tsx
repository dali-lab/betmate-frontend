import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Chessboard from 'chessboardjsx';
// import { Chess } from 'chess.js';
import './style.scss';
import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';

interface ChessMatchProps extends RouteComponentProps<{ id: string }> {
  joinGame: typeof joinGame,
  leaveGame: typeof leaveGame,
  fetchGameById: typeof fetchGameById,
  games: Record<string, Game>,
}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const gameId = props.match.params.id;
  const [fen, updateFen] = useState('');

  useEffect(() => {
    console.log(gameId);
    props.joinGame(gameId);
    props.fetchGameById(gameId);
    return () => { props.leaveGame(gameId); };
  }, []);

  useEffect(() => {
    const game = props.games[gameId];
    if (game) updateFen(game.state);
  }, [props.games]);

  return (
    <div className='chess-board'>
      <Chessboard position={fen} />
    </div>
  );
};

export default ChessMatch;
