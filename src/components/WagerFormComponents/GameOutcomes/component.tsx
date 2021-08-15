import React from 'react';
import WhiteWin from 'assets/wager_panel/wdl/white_win.svg';
import Draw from 'assets/wager_panel/wdl/draw.svg';
import BlackWin from 'assets/wager_panel/wdl/black_win.svg';
import { Game, GameOdds } from 'types/resources/game';
import { getMultiplier } from 'utils/chess';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { useParams } from 'react-router';
import '../style.scss';

const gameOutcomes = {
  White: ['white_win', WhiteWin],
  Draw: ['draw', Draw],
  Black: ['black_win', BlackWin],
};

interface GameOutcomesProps {
  setPanelLoading: React.Dispatch<React.SetStateAction<boolean>>
  odds: GameOdds
  wagersLoading: boolean
  createWager: typeof createWager
  wagerAmount: number
  games: Record<string, Game>
}

const GameOutcomes: React.FC<GameOutcomesProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const handleSubmit = (wager: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (props.wagerAmount) {
      props.createWager(
        gameId,
        wager,
        props.wagerAmount,
        true,
        1 / props.games[gameId].odds[wager],
        props.games[gameId].move_hist.length + 1,
      );
      props.setPanelLoading(true);
    }
  };

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

  const renderGameButtons = () => (
    Object.keys(gameOutcomes).map((outcome) => {
      const [outcomeCode, image] = gameOutcomes[outcome];
      return (
        <div
          key={outcome}
          className='wdl-option'
          onClick={handleSubmit(outcomeCode)}
        >
          <img src={image} alt={outcome} />
          <div>
            <p>{outcome}</p>
            <p className="odds-text">{getOdds(outcome)}x</p>
          </div>
        </div>
      );
    })
  );

  return (
    <div className="options-container wdl-options">
      {props.wagersLoading
        ? <p>Loading...</p>
        : renderGameButtons()}
    </div>
  );
};

export default GameOutcomes;
