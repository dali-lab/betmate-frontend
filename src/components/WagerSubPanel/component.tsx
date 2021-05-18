import React, { useState } from 'react';
import GameOutcomes from 'components/wagerFormComponents/GameOutcomes';
import MoveOptions from 'components/wagerFormComponents/MoveOptions';
import WagerAmounts from 'components/wagerFormComponents/WagerAmounts';
import SubmitWager from 'components/wagerFormComponents/SubmitWager';

interface WagerSubPanelProps {
  betType: 'wdl' | 'move',
}

const WagerSubPanel: React.FC<WagerSubPanelProps> = (props) => {
  const [wager, setWager] = useState('');
  const [wagerAmount, setWagerAmount] = useState(0);

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
