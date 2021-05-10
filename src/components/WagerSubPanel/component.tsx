import React, { useEffect, useState } from 'react';
import OneToken from 'assets/wager_panel/tokens/one_token.svg';
import ThreeToken from 'assets/wager_panel/tokens/three_token.svg';
import FiveToken from 'assets/wager_panel/tokens/five_token.svg';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { VerticalBar } from 'components/WagerPanel/helper_components';
import { Game } from 'types/resources/game';
import { useParams } from 'react-router';

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

interface WagerSubPanelProps {
  isAuthenticated: boolean,
  betType: 'wdl' | 'move',
  createWager: typeof createWager,
  jwtSignIn: typeof jwtSignIn,
  isLoading: boolean,
  errorMessages: string[],
  games: Record<string, Game>,
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { id: gameId } = useParams<{ id: string }>();

  useEffect(() => {
    if (props.isLoading === false) {
      // if an error occurs, both isLoading -> false and errorMessages -> [error] will update at the same time
      if (props.errorMessages) {
        setSubmissionError(true);
      }
      // clear loading text on screen
      setSubmissionLoading(false);
      if (props.isAuthenticated) props.jwtSignIn(); // updates the user balance post-bet
    } else {
      // clears error messages on screen if a new wager is submitted on either panel
      setSubmissionError(false);
    }
  }, [props.isLoading, props.errorMessages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    if (wager && wagerAmount) {
      props.createWager(
        gameId,
        wager,
        wagerAmount,
        props.betType === 'wdl',
        props.betType === 'wdl' ? 1 / props.games[gameId].odds[wager] : 3, // TODO: don't hardcode move odds
        props.games[gameId].move_hist.length + 1,
      );
    }
  };

  const renderAmounts = (wagerType) => (
    Object.keys(wagerAmounts).map((amount, i) => (
      <label htmlFor={`${wagerType}-${i}`} key={amount}>
        <img src={wagerAmounts[amount]}/>
        <p>${amount}</p>
        <input
          id={`${wagerType}-${i}`}
          name={`${wagerType}-tokens`}
          type="radio"
          value={amount}
          checked={ wagerAmount === Number(amount)}
          onChange={(e) => { setWagerAmount(Number(e.currentTarget.value)); }}
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
      return (
        <label htmlFor={`move-option-${i}`} key={move}>
          <VerticalBar color={color} maxPercentage={Number(maxPercentage)} percentage={probability} />
          <p>{move}</p>
          <input
            id={`move-option-${i}`}
            name="moves"
            type="radio"
            value={move}
            checked={wager === move}
            onChange={(e) => { setWager(e.currentTarget.value); }}
          />
        </label>
      );
    });
  };

  const renderGameOutcomes = () => (
    Object.keys(gameOutcomes).map((outcome, i) => {
      const [outcomeCode, image] = gameOutcomes[outcome];
      return (
        <label htmlFor={`wdl-option-${i}`} key={outcome}>
          <div className="wdl-option">
            <img src={image} />
            <p>{outcome}</p>
          </div>
          <input
            id={`wdl-option-${i}`}
            name="wdl"
            type="radio"
            value={outcomeCode}
            checked={wager === outcomeCode}
            onChange={(e) => { setWager(e.currentTarget.value); }}
          />
        </label>
      );
    })
  );

  return (
    <div className="bet-subpanel">
      <h1>{props.betType === 'move' ? 'Move' : 'Game'} Betting</h1>
      <form onSubmit={handleSubmit}>
        <div className="options-container">
          {props.betType === 'move' ? renderMoveOptions() : renderGameOutcomes()}
        </div>
        <div className="wager-amounts-container">
          {renderAmounts(props.betType)}
        </div>
        <input type="submit" value="Submit" disabled={!props.isAuthenticated || props.isLoading}/>
        {props.isLoading && submissionLoading ? <p className="status-text">Submitting bet...</p> : null}
        {props.errorMessages && submissionError ? <p className="status-text">{props.errorMessages[0]}</p> : null}
      </form>
    </div>
  );
};

export default WagerSubPanel;
