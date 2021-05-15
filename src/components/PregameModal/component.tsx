import React, { useEffect, useState } from 'react';
import './style.scss';
import GameOutcomes from 'components/wagerFormComponents/GameOutcomes';
import WagerAmounts from 'components/wagerFormComponents/WagerAmounts';
import { WDLBar } from 'components/WagerPanel/helper_components';
import { Game } from 'types/resources/game';
import SubmitWager from 'components/wagerFormComponents/SubmitWager';
import { useParams } from 'react-router';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { updatePregameModal } from 'store/actionCreators/gameActionCreators';

interface PregameModalProps {
  id: string,
  games: Record<string, Game>,
  createWager: typeof createWager,
  updatePregameModal: typeof updatePregameModal,
}

const PregameModal: React.FC<PregameModalProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);
  const [panelLoading, setPanelLoading] = useState(false);

  const { id: gameId } = useParams<{ id: string }>();

  useEffect(() => {
    setPanelLoading(false);
  }, []);

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
            <GameOutcomes wager={wager} setWager={setWager}/>
            <WagerAmounts wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} betType="wdl"/>
            <SubmitWager
              wager={wager}
              wagerAmount={wagerAmount}
              panelLoading={panelLoading}
              setPanelLoading={setPanelLoading}
            />
          </form>
          <button
            className="skip-button"
            type="button"
            onClick={() => { props.updatePregameModal(gameId, false); }}
          >
            skip &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PregameModal;
