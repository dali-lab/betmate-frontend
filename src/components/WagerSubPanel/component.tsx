/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Slider from 'react-slider';

import GameOutcomes from 'components/WagerFormComponents/GameOutcomes';
import MoveOptions from 'components/WagerFormComponents/MoveOptions';
import SubmitWager from 'components/WagerFormComponents/WagerMessages';
import { onEnterMovePanel, onLeaveMovePanel } from 'store/actionCreators/chessgroundActionCreators';
import { Game } from 'types/resources/game';

interface WagerSubPanelProps {
  onEnterMovePanel: typeof onEnterMovePanel
  onLeaveMovePanel: typeof onLeaveMovePanel
  betType: 'wdl' | 'move',
  games: Record<string, Game>
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wagerAmount, setWagerAmount] = useState(5);
  const [panelLoading, setPanelLoading] = useState(false);
  const { id: gameId } = useParams<{ id: string }>();

  const wagersLoading = props.games[gameId]?.pool_wagers?.move.options.length === 0;

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
              wagerAmount={wagerAmount}
              setPanelLoading={setPanelLoading}
              wagersLoading={wagersLoading}
            />
          ) : (
            <GameOutcomes
              odds={props.games[gameId]?.odds}
              wagersLoading={wagersLoading}
              wagerAmount={wagerAmount}
              setPanelLoading={setPanelLoading}
            />
          )
        }
        <SubmitWager
          panelLoading={panelLoading}
          setPanelLoading={setPanelLoading}
        />
      </form>
    </div>
  );
};

export default WagerSubPanel;
