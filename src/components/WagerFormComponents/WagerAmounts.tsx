import React, { Dispatch, SetStateAction } from 'react';
import OneToken from 'assets/wager_panel/tokens/one_token.svg';
import ThreeToken from 'assets/wager_panel/tokens/three_token.svg';
import FiveToken from 'assets/wager_panel/tokens/five_token.svg';
import './style.scss';

const wagerAmounts = {
  1: OneToken,
  3: ThreeToken,
  5: FiveToken,
};

interface WagerAmountsProps {
  wagerAmount: number,
  setWagerAmount: Dispatch<SetStateAction<number>>,
  betType: 'wdl' | 'move',
}

const WagerAmounts: React.FC<WagerAmountsProps> = (props) => {
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
          checked={ props.wagerAmount === Number(amount)}
          onChange={(e) => { props.setWagerAmount(Number(e.currentTarget.value)); }}
        />
      </label>
    ))
  );

  return (
    <div className="wager-amounts-container">
      {renderAmounts(props.betType)}
    </div>
  );
};

export default WagerAmounts;
