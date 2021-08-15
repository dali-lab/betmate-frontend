/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
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
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(5);
  const [panelLoading, setPanelLoading] = useState(false);
  const { id: gameId } = useParams<{ id: string }>();

  useEffect(() => {
    setWager('');
  }, [props.games[gameId]?.move_hist.length]);

  const wagersLoading = props.games[gameId]?.pool_wagers?.move.options.length === 0;

  const handleMouseEnter = () => props.betType === 'move' && props.onEnterMovePanel();
  const handleMouseLeave = () => props.betType === 'move' && props.onLeaveMovePanel();

  return (
    <div className={`bet-subpanel ${props.betType}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h1>{props.betType === 'move' ? 'Move' : 'Game'} Betting</h1>
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
          ? <MoveOptions
            wagerAmount={wagerAmount}
            setPanelLoading={setPanelLoading}
            wagersLoading={wagersLoading}
          />
          : <GameOutcomes
            odds={props.games[gameId]?.odds}
            wagersLoading={wagersLoading}
            wagerAmount={wagerAmount}
            setPanelLoading={setPanelLoading}
          />
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
