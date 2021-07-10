import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Chessground from '@react-chess/chessground';
import { Config } from 'chessground/config';
// import { DrawShape } from 'chessground/draw';

import PlayerInfo from 'containers/ChessMatch/playerInfo/component';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import ChatBox from 'components/ChatBox';
import PregameModal from 'components/PregameModal';
import PostgameModal from 'components/PostgameModal';

import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { gameOver } from 'utils/chess';

import { Game, GameStatus } from 'types/resources/game';
import playerIconBlack from 'assets/player_icon_black.svg';
import playerIconWhite from 'assets/player_icon_white.svg';

import './style.scss';

interface ChessMatchProps {
  joinGame: typeof joinGame
  leaveGame: typeof leaveGame
  fetchGameById: typeof fetchGameById
  games: Record<string, Game>
  showModal: Record<string, boolean>
  config: Config
}

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const game: Game | undefined = props.games[gameId];

  useEffect(() => {
    props.fetchGameById(gameId);
    props.joinGame(gameId);
    return () => { props.leaveGame(gameId); };
  }, []);

  return !game
    ? <p className="loading-text">Loading</p>
    : (
      <>
        {game.game_status === GameStatus.NOT_STARTED && props.showModal[gameId] && <PregameModal/>}
        {gameOver(game.game_status as GameStatus) && <PostgameModal/>}
        <NavBar />
        <div className='chess-match-container'>
          <ChatBox />
          <div>
            <PlayerInfo
              icon={playerIconBlack}
              fen = {game?.state ?? ''}
              name={'Black'}
              elo={game?.player_black.elo}
              time={game?.time_black}
              isBlack={true}
              gameStatus={game?.game_status as GameStatus}
              updatedAt={game?.updated_at}
            />
            <div className='chessboard'>
              <Chessground
                width={450}
                height={450}
                config={props.config}
              />
            </div>
            <PlayerInfo
              icon={playerIconWhite}
              fen = {game?.state ?? ''}
              name={'White'}
              elo={game?.player_white.elo}
              time={game?.time_white}
              isBlack={false}
              gameStatus={game?.game_status as GameStatus}
              updatedAt={game?.updated_at}
            />
          </div>
          <WagerPanel />
        </div>
      </>
    );
};

export default ChessMatch;
