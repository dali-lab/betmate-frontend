import React from 'react';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import { GameOdds } from 'types/resources/game';
import { getMultiplier } from 'utils/chess';
import '../style.scss';

const gameOutcomes = {
  White: ['white_win', WhiteWin],
  Draw: ['draw', Draw],
  Black: ['black_win', BlackWin],
};

interface GameOutcomesProps {
  odds: GameOdds
  wagersLoading: boolean
  handleSubmit: (wager: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isAuthenticated: boolean
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

  return (
    <div className="options-container wdl-options">
      {props.wagersLoading
        ? <p>Loading...</p>
        : (
          Object.keys(gameOutcomes).map((outcome) => {
            const [outcomeCode, image] = gameOutcomes[outcome];
            return (
              <div
                key={outcome}
                className={`wdl-option ${props.isAuthenticated ? 'wdl-auth' : ''}`}
                onClick={props.handleSubmit(outcomeCode)}
              >
                <img src={image} alt={outcome} />
                <div>
                  <p>{outcome}</p>
                  <p className="odds-text">{getOdds(outcome)}x</p>
                </div>
              </div>
            );
          })
        )
      }
    </div>
  );
};

export default GameOutcomes;
