import React from 'react';
import { Rank } from 'types/leaderboard';
import { User } from 'types/resources/auth';

interface RowProps {
  data: Rank,
  rowRef: React.RefObject<HTMLDivElement>
  user: User | null
}

const LeaderboardRow: React.FC<RowProps> = (props) => {
  const [firstName, lastName] = props.data.user_name.split(' ').slice(0, 2);
  return (
    <div className="leaderboard-row" ref={props.rowRef}>
      <div className="row-start">
        <div className="rank">{props.data.rank}</div>
        <div className={`username ${props.data.user_id === props.user?._id ? 'current-user' : ''}`}>
          {firstName} {lastName ? `${lastName[0]}.` : ''}
        </div>
      </div>
      <div className={`winnings ${props.data.winnings >= 0 ? 'green' : 'red'}`}>
        {props.data.winnings >= 0 ? '+' : '-'} ${Math.abs(props.data.winnings).toFixed(2)}
      </div>
    </div>
  );
};

export { LeaderboardRow };
