import React, { useState } from 'react';
import './style.scss';
import GameOutcomes from 'components/WagerFormComponents/GameOutcomes';
import WagerAmounts from 'components/WagerFormComponents/WagerAmounts';
import { WDLBar } from 'components/WagerPanel/helper_components';
import { Game } from 'types/resources/game';
import SubmitWager from 'components/WagerFormComponents/SubmitWager';
import { useParams } from 'react-router';
import { updateShowModal } from 'store/actionCreators/gameActionCreators';

interface PregameModalProps {
  games: Record<string, Game>,
  updateShowModal: typeof updateShowModal,
}

const PregameModal: React.FC<PregameModalProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);

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
            <GameOutcomes wager={wager} setWager={setWager}/>
            <WagerAmounts wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} betType="wdl"/>
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
