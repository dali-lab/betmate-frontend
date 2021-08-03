import React from 'react';
import { useParams } from 'react-router';
import { Wager, WagerStatus } from 'types/resources/wager';

interface StatLineProps {
  betType: 'win' | 'loss'
  resolvedWagers: Wager[]
  winnings: string
  losses: string
}

export const StatLine: React.FC<StatLineProps> = (props) => {
  const { id: gameId } = useParams<{ id: string }>();

  const isWin = props.betType === 'win';

  const betsWon = props.resolvedWagers
    .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.WON)
    .length;

  const betsLost = props.resolvedWagers
    .filter((wager) => wager.game_id === gameId && wager.status === WagerStatus.LOST)
    .length;

  const totalBets = props.resolvedWagers
    .filter((wager) => wager.game_id === gameId)
    .length;
  return (
    <div className="stat-line">
      <p className="stat-line-left">{isWin ? 'Bets won' : 'Bets lost'}</p>
      <div className="stat-line-right">
        <p className={isWin ? 'green-text' : 'red-text'}>
          {isWin ? betsWon : betsLost}
                        /
          {totalBets}
        </p>
        <p className={isWin ? 'green-text' : 'red-text'}>{isWin ? '+' : '-'}${isWin ? props.winnings : props.losses}</p>
      </div>
    </div>
  );
};
