import React from 'react';
import { Rank } from 'types/leaderboard';
import { User } from 'types/resources/user';

interface RowProps {
  data: Rank,
  rowRef: React.RefObject<HTMLDivElement>
  user: User | null
}

const LeaderboardRow: React.FC<RowProps> = (props) => {
  return (
    <div className="leaderboard-row" ref={props.rowRef}>
      <div className="row-start">
        <div className="rank">{props.data.rank}</div>
        <div
          className={`username ${props.data.user_id === props.user?._id ? 'current-user' : ''}`}
        >
          {props.data.user_name}
        </div>
      </div>
      <div className={`winnings ${props.data.winnings >= 0 ? 'green' : 'red'}`}>
        {props.data.winnings >= 0 ? '+' : '-'} ${Math.abs(props.data.winnings).toFixed(2)}
      </div>
    </div>
  );
};

export { LeaderboardRow };
