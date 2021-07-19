import React, { useEffect, useRef, useState } from 'react';
import BidirectionalScroll from 'react-bidirectional-infinite-scroll';
import ordinal from 'ordinal';

import { getLeaderboardSection, Rank, getLeaderboardRank } from 'store/requests/leaderboardRequests';
import { User } from 'types/resources/user';
import resetIcon from 'assets/dashboard/reset.svg';

import './styles.scss';

interface LeaderboardProps {
  user: User | null
}

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  const [rankings, setRankings] = useState<Rank[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreUp, setHasMoreUp] = useState(false);
  const boardRef = useRef<BidirectionalScroll>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const [userRank, setUserRank] = useState<number | undefined>();
  const [atUser, setAtUser] = useState(false);

  const getData = async () => {
    if (!hasMore) return;
    console.log('rankings', rankings);
    const nextRank = rankings.length > 0
      ? rankings[rankings.length - 1].rank
      : 0;
    const { data } = await getLeaderboardSection(nextRank, nextRank + 10);
    setHasMore(data.rankings_size > data.rankings[data.rankings.length - 1].rank);
    setRankings((r) => r.concat(data.rankings));
  };

  const getDataTop = async () => {
    if (!hasMoreUp) return;
    if (rankings.length === 0) { getData(); return; }

    const nextRank = rankings[0].rank - 1;
    const { data } = await getLeaderboardSection(Math.min(nextRank - 10, 0), nextRank);
    setHasMoreUp(data.rankings[0].rank > 1);
    setRankings((r) => data.rankings.concat(r));

    // Adjust scroll position for new data
    boardRef.current.scroller.scrollTop = (rowRef.current?.clientHeight ?? 0) * data.rankings.length;
  };

  const handleRankClick = async () => {
    setAtUser(true);
    setRankings([]);
    setHasMoreUp(true);
    const { data } = await getLeaderboardSection((userRank ?? 0) - 5, (userRank ?? 0) + 5);
    setHasMore(data.rankings_size > data.rankings[data.rankings.length - 1].rank);
    setRankings((r) => r.concat(data.rankings));
    // Adjust scroll position for new data
    boardRef.current.scroller.scrollTop = (rowRef.current?.clientHeight ?? 0) * 2;
  };

  const getUserRank = async () => {
    const { data } = await getLeaderboardRank();
    setUserRank(data.rank);
  };

  const handleReset = () => {
    if (!atUser) return;
    setAtUser(false);
    setRankings([]);
    setHasMoreUp(false);
    setTimeout(getData, 1000);
  };

  useEffect(() => {
    getData();
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
          onReachBottom={getData}
          onReachTop={getDataTop}
          ref={boardRef}
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
