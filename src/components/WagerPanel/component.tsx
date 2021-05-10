import React from 'react';
import BalanceIcon from 'assets/wager_panel/balance-icon.svg';
import { WDLBar } from 'components/WagerPanel/helper_components';
import WagerSubPanel from 'components/WagerSubPanel';

interface WagerPanelProps {
  isAuthenticated: boolean,
  balance: number | undefined,
}

const WagerPanel: React.FC<WagerPanelProps> = (props) => {
  return (
    <div className="wager-panel-container">
      {(props.isAuthenticated && props.balance !== undefined) && (
        <div className="balance-text">
          <p>Balance: {props.balance} tokens</p>
          <img src={BalanceIcon} />
        </div>
      )}
      <WagerSubPanel betType="move"/>
      <WagerSubPanel betType="wdl"/>
      {/* TODO: don't hardcode wdl numbers */}
      <WDLBar white={60} draw={10} black={30}/>
    </div>
  );
};

export default WagerPanel;
