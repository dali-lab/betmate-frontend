import React, { useEffect, useState } from 'react';
import GameOutcomes from 'components/wagerFormComponents/GameOutcomes';
import MoveOptions from 'components/wagerFormComponents/MoveOptions';
import WagerAmounts from 'components/wagerFormComponents/WagerAmounts';
import SubmitWager from 'components/wagerFormComponents/SubmitWager';
import { Game } from 'types/resources/game';
import { useParams } from 'react-router';

interface WagerSubPanelProps {
  betType: 'wdl' | 'move',
  games: Record<string, Game>,
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);

  const { id: gameId } = useParams<{ id: string }>();

  useEffect(() => {
    setWager('');
    setWagerAmount(0);
  }, [props.games[gameId]?.move_hist.length]);

  return (
    <div className="bet-subpanel">
      <h1>{props.betType === 'move' ? 'Move' : 'Game'} Betting</h1>
      <form>
        {props.betType === 'move'
          ? <MoveOptions wager={wager} setWager={setWager}/>
          : <GameOutcomes wager={wager} setWager={setWager}/>
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
