import React, { Dispatch, SetStateAction } from 'react';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import { GameOdds } from 'types/resources/game';
import { getMultiplier } from 'utils/chess';
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
  wagersLoading: boolean
}

const GameOutcomes: React.FC<GameOutcomesProps> = (props) => {
  const getOdds = (odds: string) => {
    switch (odds) {
      case 'White':
        return getMultiplier(1 / props.odds.white_win);
      case 'Black':
        return getMultiplier(1 / props.odds.black_win);
      case 'Draw':
        return getMultiplier(1 / props.odds.draw);
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
            <div>
              <p>{outcome}</p>
              <p className="odds-text">{getOdds(outcome)}x</p>
            </div>
          </div>
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
    <div className="options-container wdl-options">
      {props.wagersLoading
        ? <p>Loading...</p>
        : renderGameOutcomes()}
    </div>
  );
};

export default GameOutcomes;