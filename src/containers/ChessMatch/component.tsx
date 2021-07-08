import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import Chessground from '@react-chess/chessground';
import { Config } from 'chessground/config';
import { Key } from 'chessground/types';
import { DrawShape } from 'chessground/draw';
import { ChessInstance } from 'chess.js';

import PlayerInfo from 'containers/ChessMatch/playerInfo/component';
import WagerPanel from 'components/WagerPanel';
import NavBar from 'components/NavBar';
import ChatBox from 'components/ChatBox';
import PregameModal from 'components/PregameModal';
import PostgameModal from 'components/PostgameModal';

import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { GameStatus, gameOver } from 'utils/chess';
import { moveOptionColors } from 'utils/config';

import { Game } from 'types/resources/game';
import playerIconBlack from 'assets/player_icon_black.svg';
import playerIconWhite from 'assets/player_icon_white.svg';

import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chess: ChessInstance = require('chess.js')();

interface ChessMatchProps {
  joinGame: typeof joinGame
  leaveGame: typeof leaveGame
  fetchGameById: typeof fetchGameById
  games: Record<string, Game>
  showModal: Record<string, boolean>
}

const initialCgConfig: Config = {
  highlight: { lastMove: true, check: true },
  drawable: {
    brushes: {
      0: {
        key: 'first', color: moveOptionColors[0], opacity: 1, lineWidth: 10,
      },
      1: {
        key: 'second', color: moveOptionColors[1], opacity: 1, lineWidth: 10,
      },
      2: {
        key: 'third', color: moveOptionColors[2], opacity: 1, lineWidth: 10,
      },
      3: {
        key: 'other', color: moveOptionColors[3], opacity: 1, lineWidth: 10,
      },
    },
  },
};

const ChessMatch: React.FC<ChessMatchProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();
  const [fen, updateFen] = useState('');
  const [config, updateConfig] = useState(initialCgConfig);
  const [shapesVisible, setShapesVisible] = useState(false);
  const [autoShapes, setAutoShapes] = useState<DrawShape[]>([]);

  const game: Game | undefined = props.games[gameId];

  useEffect(() => {
    props.fetchGameById(gameId);
    props.joinGame(gameId);
    return () => { props.leaveGame(gameId); };
  }, []);

  useEffect(() => {
    if (game) {
      const hasLastMove = game.move_hist.length > 0;
      const [{ to, from }] = hasLastMove
        ? game.move_hist.slice(-1)
        : [{ to: '', from: '' }];

      updateConfig((c) => ({
        ...c,
        fen: game.state,
        lastMove: [from, to] as Key[],
        highlight: { lastMove: hasLastMove, check: true },
      }));

      updateFen(game.state);
    }
  }, [game?.state]);

  useEffect(() => {
    if (game) {
      const topMoves = game.pool_wagers.move.options;

      chess.load(game.state);
      // const brushes = ['green', 'red', 'blue'];
      const newAutoShapes = topMoves
        .map((move, i) => {
          const m = chess.move(move);
          chess.undo();
          return m ? { orig: m.from, dest: m.to, brush: String(i) } as DrawShape : null;
        })
        .filter((m): m is DrawShape => !!m);
      setAutoShapes(newAutoShapes);

      // console.log('autoshapes', config.drawable?.autoShapes);

      if (shapesVisible) {
        updateConfig((c) => ({
          ...c,
          drawable: {
            ...c.drawable,
            autoShapes: newAutoShapes,
          },
        }));
      }
    }
  }, [game?.pool_wagers]);

  useEffect(() => {
    updateConfig((c) => ({
      ...c,
      drawable: {
        ...c.drawable,
        autoShapes: shapesVisible ? autoShapes : [],
      },
    }));
  }, [shapesVisible]);

  const onEnterMovePanel = useCallback(() => {
    setShapesVisible(true);
  }, []);

  const onLeaveMovePanel = useCallback(() => {
    setShapesVisible(false);
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
              fen = {fen}
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
                config={config}
              />
            </div>
            <PlayerInfo
              icon={playerIconWhite}
              fen = {fen}
              name={'White'}
              elo={game?.player_white.elo}
              time={game?.time_white}
              isBlack={false}
              gameStatus={game?.game_status as GameStatus}
              updatedAt={game?.updated_at}
            />
          </div>
          <WagerPanel onEnterMovePanel={onEnterMovePanel} onLeaveMovePanel={onLeaveMovePanel} />
        </div>
      </>
    );
};

export default ChessMatch;
