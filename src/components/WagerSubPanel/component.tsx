import React, { useState, useEffect } from 'react';
import GameOutcomes from 'components/WagerFormComponents/GameOutcomes';
import MoveOptions from 'components/WagerFormComponents/MoveOptions';
import WagerAmounts from 'components/WagerFormComponents/WagerAmounts';
import SubmitWager from 'components/WagerFormComponents/SubmitWager';
import { useParams } from 'react-router';
import { Game } from 'types/resources/game';

interface WagerSubPanelProps {
  betType: 'wdl' | 'move',
  games: Record<string, Game>
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);
  const { id: gameId } = useParams<{ id: string }>();

  useEffect(() => {
    setWager('');
    setWagerAmount(0);
  }, [props.games[gameId]?.move_hist.length]);

  const { options: moveOptions, wagers } = props.games[gameId]?.pool_wagers?.move;
  const wagersLoading = moveOptions?.length === 0 || !wagers;

  return (
    <div className="bet-subpanel">
      <h1>{props.betType === 'move' ? 'Move' : 'Game'} Betting</h1>
      <form>
        {props.betType === 'move'
          ? <MoveOptions wager={wager} setWager={setWager} wagersLoading={wagersLoading} />
          : <GameOutcomes odds = {props.games[gameId]?.odds} wager={wager} setWager={setWager} wagersLoading={wagersLoading} />
        }
        <WagerAmounts wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} betType={props.betType}/>
        <SubmitWager
          betType={props.betType}
          wager={wager}
          wagerAmount={wagerAmount}
        />
      </form>
    </div>
  );
};

export default WagerSubPanel;
