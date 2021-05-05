import React, { useEffect, useState } from 'react';
import OneToken from 'assets/wager_panel/tokens/one_token.svg';
import ThreeToken from 'assets/wager_panel/tokens/three_token.svg';
import FiveToken from 'assets/wager_panel/tokens/five_token.svg';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import BalanceIcon from 'assets/wager_panel/balance-icon.svg';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { VerticalBar, WDLBar } from 'components/WagerPanel/helper_components';

const wagerAmounts = {
  1: OneToken,
  3: ThreeToken,
  5: FiveToken,
};

// TODO: replace moveOptions w real data from a backend request
const moveOptions = {
  d4: [40, '#8CCDBD'],
  e4: [30, '#E527AF'],
  d3: [20, '#FADF9B'],
  Other: [10, '#C4C4C4'],
};

const gameOutcomes = {
  White: ['white_win', WhiteWin],
  Draw: ['draw', Draw],
  Black: ['black_win', BlackWin],
};

interface WagerPanelProps {
  isAuthenticated: boolean,
  gameId: string,
  balance: number | undefined,
  createWager: typeof createWager,
  jwtSignIn: typeof jwtSignIn,
  isLoading: boolean,
  errorMessages: string[],
}

const WagerPanel: React.FC<WagerPanelProps> = (props) => {
  const [moveWager, setMoveWager] = useState('');
  const [wdlWager, setWdlWager] = useState('');

  const [moveWagerAmount, setMoveWagerAmount] = useState(0);
  const [wdlWagerAmount, setWdlWagerAmount] = useState(0);

  const [moveSubmissionLoading, setMoveSubmissionLoading] = useState(false);
  const [wdlSubmissionLoading, setWdlSubmissionLoading] = useState(false);

  const [moveSubmissionError, setMoveSubmissionError] = useState(false);
  const [wdlSubmissionError, setWdlSubmissionError] = useState(false);

  useEffect(() => {
    if (props.isLoading === false) {
      // if an error occurs, both isLoading -> false and errorMessages -> [error] will update at the same time
      if (props.errorMessages) {
        // identifies the panel responsible for the error
        if (moveSubmissionLoading) setMoveSubmissionError(true);
        if (wdlSubmissionLoading) setWdlSubmissionError(true);
      }
      // clear loading text on screen
      setMoveSubmissionLoading(false);
      setWdlSubmissionLoading(false);
      if (props.isAuthenticated) props.jwtSignIn(); // updates the user balance post-bet
    } else {
      // clears error messages on screen if a new wager is submitted on either panel
      setMoveSubmissionError(false);
      setWdlSubmissionError(false);
    }
  }, [props.isLoading, props.errorMessages.length]);

  const handleMoveSubmit = (e) => {
    e.preventDefault();
    setMoveSubmissionLoading(true);
    if (moveWager && moveWagerAmount) {
      props.createWager(
        props.gameId,
        moveWager,
        moveWagerAmount,
        false, // not a wdl wager
        3, // TODO: don't hardcode odds and movenumber
        1,
      );
    }
  };

  const handleWdlSubmit = (e) => {
    e.preventDefault();
    setWdlSubmissionLoading(true);
    if (wdlWager && wdlWagerAmount) {
      props.createWager(
        props.gameId,
        wdlWager,
        wdlWagerAmount,
        true, // is a wdl wager
        3, // TODO: don't hardcode odds and movenumber
        1,
      );
    }
  };

  const renderAmounts = (wagerType) => (
    Object.keys(wagerAmounts).map((amount, i) => (
      <label htmlFor={`${wagerType}-${i}`} key={amount}>
        <img src={wagerAmounts[amount]}/>
        <p>{amount} Token{Number(amount) > 1 && 's'}</p>
        <input
          id={`${wagerType}-${i}`}
          name={`${wagerType}-tokens`}
          type="radio"
          value={amount}
          checked={
            (wagerType === 'move' && moveWagerAmount === Number(amount))
            || (wagerType === 'wdl' && wdlWagerAmount === Number(amount))
          }
          onChange={(e) => {
            if (wagerType === 'move') setMoveWagerAmount(Number(e.currentTarget.value));
            if (wagerType === 'wdl') setWdlWagerAmount(Number(e.currentTarget.value));
          }}
        />
      </label>
    ))
  );

  const renderMoveOptions = () => {
    const maxPercentage = Object.values(moveOptions).reduce((currMax, [probability]) => (
      currMax > probability ? currMax : probability
    ), 0);
    return Object.keys(moveOptions).map((move, i) => {
      const [probability, color] = moveOptions[move];
      return <label htmlFor={`move-option-${i}`} key={move}>
        <VerticalBar color={color} maxPercentage={Number(maxPercentage)} percentage={probability} />
        <p>{move}</p>
        <input
          id={`move-option-${i}`}
          name="moves"
          type="radio"
          value={move}
          checked={moveWager === move}
          onChange={(e) => { setMoveWager(e.currentTarget.value); }}
        />
      </label>;
    });
  };

  const renderGameOutcomes = () => (
    Object.keys(gameOutcomes).map((outcome, i) => {
      const [outcomeCode, image] = gameOutcomes[outcome];
      return <label htmlFor={`wdl-option-${i}`} key={outcome}>
        <div className="wdl-option">
          <img src={image} />
          <p>{outcome}</p>
        </div>
        <input
          id={`wdl-option-${i}`}
          name="wdl"
          type="radio"
          value={outcomeCode}
          checked={wdlWager === outcomeCode}
          onChange={(e) => { setWdlWager(e.currentTarget.value); }}
        />
      </label>;
    })
  );

  return (
    <div className="wager-panel-container">
      {(props.isAuthenticated && props.balance !== undefined) && (
        <div className="balance-text">
          <p>Balance: {props.balance} tokens</p>
          <img src={BalanceIcon} />
        </div>
      )}
      <div className="bet-subpanel">
        <h1>Move Betting</h1>
        <form onSubmit={handleMoveSubmit}>
          <div className="options-container">
            {renderMoveOptions()}
          </div>
          <div className="wager-amounts-container">
            {renderAmounts('move')}
          </div>
          <input type="submit" value="Submit" disabled={!props.isAuthenticated || props.isLoading}/>
          {props.isLoading && moveSubmissionLoading ? <p className="status-text">Submitting bet...</p> : null}
          {props.errorMessages && moveSubmissionError ? <p className="status-text">{props.errorMessages[0]}</p> : null}
        </form>
      </div>
      <div className="bet-subpanel">
        <h1>Game Betting</h1>
        <form onSubmit={handleWdlSubmit}>
          <div className="options-container">
            {renderGameOutcomes()}
          </div>
          <div className="wager-amounts-container">
            {renderAmounts('wdl')}
          </div>
          <input type="submit" value="Submit" disabled={!props.isAuthenticated || props.isLoading}/>
          {props.isLoading && wdlSubmissionLoading ? <p className="status-text">Submitting bet...</p> : null}
          {props.errorMessages && wdlSubmissionError ? <p className="status-text">{props.errorMessages[0]}</p> : null}
        </form>
      </div>
      {/* TODO: don't hardcode wdl numbers */}
      <WDLBar white={60} draw={10} black={30}/>
    </div>
  );
};

export default WagerPanel;
