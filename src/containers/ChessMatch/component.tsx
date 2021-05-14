import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chessboard from 'chessboardjsx';
import './style.scss';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import ChatBox from 'components/ChatBox';

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
        <ChatBox />
        <div>
          <Chessboard position={fen} width={450}/>
        </div>
        <WagerPanel/>
      </div>
    </>
  );
};

export default ChessMatch;
