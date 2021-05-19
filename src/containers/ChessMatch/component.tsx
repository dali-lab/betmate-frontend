import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { useParams } from 'react-router';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { Game } from 'types/resources/game';
import ChatBox from 'components/ChatBox';
import PregameModal from 'components/PregameModal';
import playerIconBlack from 'assets/player_icon_black.svg';
import playerIconWhite from 'assets/player_icon_white.svg';
import PlayerInfo from 'containers/ChessMatch/playerInfo/component';
import './style.scss';

interface ChessMatchProps {
  joinGame: typeof joinGame
  leaveGame: typeof leaveGame
  fetchGameById: typeof fetchGameById
  games: Record<string, Game>
  showModal: Record<string, boolean>
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

  if (!props.games[gameId]) return <p>Loading</p>;
  return (
    <>
      {props.games[gameId].game_status === 'not_started' && props.showModal[gameId] && <PregameModal/>}
      <NavBar />
      <div className='chess-match-container'>
        <ChatBox />
        <div>
          <PlayerInfo
            icon={playerIconBlack}
            name={props.games[gameId]?.player_black.name}
            elo={props.games[gameId]?.player_black.elo}
            time={props.games[gameId]?.time_black}
            isBlack={true}
          />
          <div className='chessBoard'>
            <Chessboard position={fen} width={450}/>
          </div>
          <PlayerInfo
            icon={playerIconWhite}
            name={props.games[gameId]?.player_white.name}
            elo={props.games[gameId]?.player_white.elo}
            time={props.games[gameId]?.time_white}
            isBlack={false}
          />
        </div>
        <WagerPanel/>
      </div>
    </>
  );
};

export default ChessMatch;
