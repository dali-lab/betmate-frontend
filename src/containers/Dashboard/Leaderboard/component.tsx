import React, { useEffect, useRef, useState } from 'react';
import BidirectionalScroll from 'react-bidirectional-infinite-scroll';
import ordinal from 'ordinal';

import { getLeaderboardSection, getLeaderboardRank } from 'store/requests/leaderboardRequests';
import { LeaderboardSection, Rank } from 'types/leaderboard';
import { User } from 'types/resources/user';
import resetIcon from 'assets/dashboard/reset.svg';

import './styles.scss';

interface LeaderboardProps {
  user: User | null
}

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  const [rankings, setRankings] = useState<Rank[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [userRank, setUserRank] = useState<number | undefined>();
  const [atUser, setAtUser] = useState(false);
  const [position, setPosition] = useState(0);

  // const boardRef = useRef<BidirectionalScroll>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const getFirstRank = (r: Rank[]) => r[0].rank;
  const getLastRank = (r: Rank[]) => r[r.length - 1].rank;
  const doesHaveMore = (d: LeaderboardSection) => d.rankings_size > getLastRank(d.rankings);

  const getRankingsHead = async () => {
    const { data } = await getLeaderboardSection(0, 10);
    setHasMore(doesHaveMore(data));
    setRankings(data.rankings);
  };

  const extendRankingsBottom = async () => {
    if (!hasMore) return;

    const nextRank = getLastRank(rankings);
    const { data } = await getLeaderboardSection(nextRank, nextRank + 10);
    setHasMore(doesHaveMore(data));
    setRankings((r) => r.concat(data.rankings));
  };

  const extendRankingsTop = async () => {
    const firstRank = getFirstRank(rankings);
    if (firstRank <= 1) return;

    const nextRank = firstRank - 1;
    const { data } = await getLeaderboardSection(Math.max(nextRank - 10, 0), nextRank);
    setRankings((r) => data.rankings.concat(r));

    // Adjust scroll position for new data
    // boardRef.current.scroller.scrollTop = (rowRef.current?.clientHeight ?? 0) * data.rankings.length;
    setPosition((rowRef.current?.clientHeight ?? 58) * data.rankings.length);
  };

  const handleRankClick = async () => {
    setAtUser(true);
    setRankings([]);
    const { data } = await getLeaderboardSection((userRank ?? 0) - 5, (userRank ?? 0) + 5);
    setHasMore(doesHaveMore(data));
    setRankings(data.rankings);

    // Adjust scroll position for new data
    // boardRef.current.scroller.scrollTop = (rowRef.current?.clientHeight ?? 0) * 2;
    setPosition((rowRef.current?.clientHeight ?? 0) * 2);
  };

  const getUserRank = async () => {
    const { data } = await getLeaderboardRank();
    setUserRank(data.rank);
  };

  const handleReset = () => {
    if (!atUser) return;
    setAtUser(false);
    setRankings([]);
    getRankingsHead();
  };

  useEffect(() => {
    getRankingsHead();
    getUserRank();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Monthly Leaderboard 🏅</h2>
        <div
          className={`reset-button ${atUser ? 'active' : ''}`}
          onClick={handleReset}
        >
          <img src={resetIcon}/>
        </div>
      </div>
      <div className="leaderboard-card" >
        <BidirectionalScroll
          onReachBottom={extendRankingsBottom}
          onReachTop={extendRankingsTop}
          position={position}
          onScroll={(pos) => setPosition(pos)}
          // ref={boardRef}
        >
          {rankings.map((rankData, i) => (
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
        {(!atUser && userRank) && <div
          className="user-rank"
          onClick={handleRankClick}
        >
          Your ranking: {ordinal(userRank)}
        </div>}
      </div>
    </div>
  );
};

export default Leaderboard;
