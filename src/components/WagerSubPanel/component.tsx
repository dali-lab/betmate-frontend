/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import Slider from 'react-slider';

import { GameOutcomes, MoveOptions, WagerMessages } from 'components/WagerFormComponents';
import { onEnterMovePanel, onLeaveMovePanel } from 'store/actionCreators/chessgroundActionCreators';
import { Game } from 'types/resources/game';
import { createWager } from 'store/actionCreators/wagerActionCreators';

interface WagerSubPanelProps {
  onEnterMovePanel: typeof onEnterMovePanel
  onLeaveMovePanel: typeof onLeaveMovePanel
  isAuthenticated: boolean
  betType: 'wdl' | 'move',
  games: Record<string, Game>
  createWager: typeof createWager
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wagerAmount, setWagerAmount] = useState(5);
  const [panelLoading, setPanelLoading] = useState(false);
  const { id: gameId } = useParams<{ id: string }>();

  const wagersLoading = props.games[gameId]?.pool_wagers?.move.options.length === 0;

  const handleSubmit = useCallback((wdl: boolean) => (wager: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (wagerAmount && props.isAuthenticated) {
      props.createWager(
        gameId,
        wager,
        wagerAmount,
        wdl,
        wdl ? 1 / props.games[gameId].odds[wager] : 1,
        props.games[gameId].move_hist.length + 1,
      );
      setPanelLoading(true);
    }
  }, [wagerAmount, props.isAuthenticated, gameId, props.games[gameId]]);

  const wagerExplanation = props.betType === 'move'
    ? 'Bet on which move will happen next. Win tokens from others in the pool.'
    : 'Bet on the outcome of the game. Win tokens from the house.';

  const handleMouseEnter = () => props.betType === 'move' && props.onEnterMovePanel();
  const handleMouseLeave = () => props.betType === 'move' && props.onLeaveMovePanel();

  return (
    <div className={`bet-subpanel ${props.betType}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='wager-header'>
        <h1>{props.betType === 'move' ? 'Move' : 'Game'} Betting</h1>
        <p>{wagerExplanation}</p>
      </div>
      <form>
        <Slider
          max={10}
          min={1}
          className="slider"
          thumbClassName={`thumb thumb-${props.betType}`}
          trackClassName={`track track-${props.betType}`}
          renderThumb={(prps, state) => <div {...prps}>${state.valueNow}</div>}
          renderTrack={(prps) => <div {...prps} />}
          value={wagerAmount}
          onChange={(value) => setWagerAmount(value)}
        />
        {props.betType === 'move'
          ? (
            <MoveOptions
              wagersLoading={wagersLoading}
              handleSubmit={handleSubmit(false)}
            />
          ) : (
            <GameOutcomes
              odds={props.games[gameId]?.odds}
              wagersLoading={wagersLoading}
              handleSubmit={handleSubmit(true)}
            />
          )
        }
        <WagerMessages
          panelLoading={panelLoading}
          setPanelLoading={setPanelLoading}
        />
      </form>
    </div>
  );
};

export default WagerSubPanel;
