import React, { Dispatch, SetStateAction } from 'react';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import { GameOdds } from 'types/resources/game';
import './style.scss';

const gameOutcomes = {
  White: ['white_win', WhiteWin],
  Draw: ['draw', Draw],
  Black: ['black_win', BlackWin],
};

interface GameOutcomesProps {
  setWager: Dispatch<SetStateAction<string>>
  wager: string
  odds: GameOdds
}

const GameOutcomes: React.FC<GameOutcomesProps> = (props) => {
  const getMultiplier = (odd: number) => {
    if (odd <= 0) return 0;
    const multiplier = Math.trunc(1 / odd);
    if (multiplier < 2) {
      return multiplier.toFixed(2);
    } else if (multiplier < 10) {
      return multiplier.toFixed(1);
    } else {
      return multiplier;
    }
  };

  const getOdds = (odds: string) => {
    switch (odds) {
      case 'White':
        return getMultiplier(props.odds.white_win);
      case 'Black':
        return getMultiplier(props.odds.black_win);
      case 'Draw':
        return getMultiplier(props.odds.draw);
      default:
        return 0;
    }
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
          <p>{getOdds(outcome)}x</p>
          <input
            id={`wdl-option-${i}`}
            name="wdl"
            type="radio"
            value={outcomeCode}
            checked={props.wager === outcomeCode}
            onChange={(e) => { props.setWager(e.currentTarget.value); }}
          />
        </label>
      );
    })
  );

  return (
    <div className="options-container">
      {renderGameOutcomes()}
    </div>
  );
};

export default GameOutcomes;
