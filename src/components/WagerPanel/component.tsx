import React from 'react';
import BalanceIcon from 'assets/wager_panel/balance-icon.svg';
import { WDLBar, WDLProbability } from 'components/WagerPanel/helper_components';
import WagerSubPanel from 'components/WagerSubPanel';
import { useParams } from 'react-router';
import { Game } from 'types/resources/game';

interface WagerPanelProps {
  isAuthenticated: boolean,
  balance: number | undefined,
  games: Record<string, Game>,
}

const WagerPanel: React.FC<WagerPanelProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  return (
    <div className="wager-panel-container">
      {(props.isAuthenticated && props.balance !== undefined) && (
        <div className="balance-text">
          <p>Balance: {props.balance.toFixed(2)} tokens</p>
          <img src={BalanceIcon} />
        </div>
      )}
      <WagerSubPanel betType="move" />
      <WagerSubPanel betType="wdl"/>
      <div>
        <WDLProbability odds={props.games[gameId]?.odds} height={20}/>
        <WDLBar odds={props.games[gameId]?.odds} height={20}/>
      </div>
    </div>
  );
};

export default WagerPanel;
