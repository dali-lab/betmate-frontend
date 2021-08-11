/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Slider from 'react-slider';
import { useParams } from 'react-router';
import { WDLBar } from 'components/WagerPanel/helper_components';
import { Game } from 'types/resources/game';
import { updateShowModal } from 'store/actionCreators/gameActionCreators';
import { GameOutcomes, SubmitWager } from '../WagerFormComponents';

import './style.scss';

interface PregameModalProps {
  games: Record<string, Game>,
  updateShowModal: typeof updateShowModal,
}

const PregameModal: React.FC<PregameModalProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(5);

  const { id: gameId } = useParams<{ id: string }>();

  const wagersLoading = props.games[gameId]?.pool_wagers?.move.options.length === 0;

  return (
    <div className="blur-background">
      <div className="pregame-modal-container">
        <div className="padding-container">
          <h1>Pre-Game Bets</h1>
          <h3>Select a winning side and an amount to bet on the outcome of the game.</h3>
          <form className="pregame-body-container">
            <div className="pregame-wdl-container">
              <WDLBar
                odds={props.games[gameId]?.odds}
                height={30}
              />
            </div>

            <Slider
              max={10}
              min={1}
              className="slider"
              thumbClassName="thumb"
              trackClassName="track"
              renderThumb={(prps, state) => <div {...prps}>${state.valueNow}</div>}
              renderTrack={(prps) => <div {...prps} />}
              value={wagerAmount}
              onChange={(value) => setWagerAmount(value)}
            />
            <GameOutcomes odds={props.games[gameId]?.odds} wager={wager} setWager={setWager} wagersLoading={wagersLoading} />
            <SubmitWager
              wager={wager}
              wagerAmount={wagerAmount}
              betType={'wdl'}
            />
          </form>
          <button
            className="skip-button"
            type="button"
            onClick={() => { props.updateShowModal(gameId, false); }}
          >
            skip &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PregameModal;
