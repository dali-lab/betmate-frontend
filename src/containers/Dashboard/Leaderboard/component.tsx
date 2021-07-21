import React, { useEffect, useRef } from 'react';
import BidirectionalScroll from 'react-bidirectional-infinite-scroll';
import ordinal from 'ordinal';

import {
  onLeaderboardScroll,
  getLeaderboardHead,
  extendLeaderboardTop,
  extendLeaderboardBottom,
  getUserRank,
  goToUserPosition,
  leaveUserPosition,
} from 'store/actionCreators/leaderboardActionCreators';
import { User } from 'types/resources/user';
import { Rank } from 'types/leaderboard';
import resetIcon from 'assets/dashboard/reset.svg';

import './styles.scss';

interface LeaderboardProps {
  user: User | null
  rankings: Rank[]
  position: number
  userRank: number
  atUser: boolean
  onLeaderboardScroll: typeof onLeaderboardScroll
  getLeaderboardHead: typeof getLeaderboardHead
  extendLeaderboardTop: typeof extendLeaderboardTop
  extendLeaderboardBottom: typeof extendLeaderboardBottom
  getUserRank: typeof getUserRank
  goToUserPosition: typeof goToUserPosition
  leaveUserPosition: typeof leaveUserPosition
}

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleReachTop = () => {
    const rowSize = rowRef.current?.clientHeight ?? 0;
    props.extendLeaderboardTop(rowSize);
  };

  const handleRankClick = () => {
    const rowSize = rowRef.current?.clientHeight ?? 0;
    props.goToUserPosition(rowSize);
  };

  const handleReset = () => {
    if (!props.atUser) return;
    props.leaveUserPosition();
  };

  useEffect(() => {
    props.getLeaderboardHead();
  }, []);

  useEffect(() => {
    if (props.user) props.getUserRank();
  }, [props.user]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Leaderboard 🏅</h2>
        <div
          className={`reset-button ${props.atUser ? 'active' : ''}`}
          onClick={handleReset}
        >
          <img src={resetIcon}/>
        </div>
      </div>
      <div className="leaderboard-card" >
        <BidirectionalScroll
          onReachBottom={props.extendLeaderboardBottom}
          onReachTop={handleReachTop}
          position={props.position}
          onScroll={props.onLeaderboardScroll}
        >
          {props.rankings.map((rankData, i) => (
            <div key={i} className="leaderboard-row" ref={rowRef}>
              <div className="row-start">
                <div className="rank">{rankData.rank}</div>
                <div
                  className={`username ${rankData.user_id === props.user?._id ? 'current-user' : ''}`}
                >
                  {rankData.user_name}
                </div>
              </div>
              <div className={`winnings ${rankData.winnings >= 0 ? 'green' : 'red'}`}>
                {rankData.winnings >= 0 ? '+' : '-'} ${Math.abs(rankData.winnings).toFixed(2)}
              </div>
            </div>
          ))}
        </BidirectionalScroll>
        {(!props.atUser && props.userRank) && (
          <div
            className="user-rank"
            onClick={handleRankClick}
          >
          Your ranking: {ordinal(props.userRank)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
