/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Slider from 'react-slider';
import { useParams } from 'react-router';
import { WDLBar } from 'components/WagerPanel/helper_components';
import { Game } from 'types/resources/game';
import { updateShowModal } from 'store/actionCreators/gameActionCreators';
import { WagerMessages } from '../WagerFormComponents';

import './style.scss';

interface PregameModalProps {
  games: Record<string, Game>,
  updateShowModal: typeof updateShowModal,
}

const PregameModal: React.FC<PregameModalProps> = (props) => {
  const [wagerAmount, setWagerAmount] = useState(5);
  const [panelLoading, setPanelLoading] = useState(false);

  const { id: gameId } = useParams<{ id: string }>();

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
              className="slider-pregame"
              thumbClassName="thumb-pregame"
              trackClassName="track-pregame"
              renderThumb={(prps, state) => <div {...prps}>${state.valueNow}</div>}
              renderTrack={(prps) => <div {...prps} />}
              value={wagerAmount}
              onChange={(value) => setWagerAmount(value)}
            />
            {/* <GameOutcomes
              odds={props.games[gameId]?.odds}
              wager={wager}
              setWager={setWager}
              wagersLoading={wagersLoading}
            /> */}
            <WagerMessages
              panelLoading={panelLoading}
              setPanelLoading={setPanelLoading}
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
