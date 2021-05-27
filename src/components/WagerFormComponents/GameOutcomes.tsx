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
  const getMultiplier = (odds: string) => {
    let odd = 0;
    switch (odds) {
      case 'White':
        odd = props.odds.white_win;
        break;
      case 'Black':
        odd = props.odds.black_win;
        break;
      case 'Draw':
        odd = props.odds.draw;
        break;
      default:
        return '';
    }
    return Math.floor((1 / odd) * 10) / 10; // round down to the nearest tenth
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
          <p>{getMultiplier(outcome)}x</p>
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
