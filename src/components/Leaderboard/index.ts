import { connect } from 'react-redux';

import { RootState } from 'types/state';
import {
  onLeaderboardScroll, getLeaderboardHead, extendLeaderboardTop, extendLeaderboardBottom, getUserRank, goToUserPosition, leaveUserPosition,
} from 'store/actionCreators/leaderboardActionCreators';
import Leaderboard from './component';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  rankings: state.leaderboard.rankings,
  position: state.leaderboard.position,
  userRank: state.leaderboard.userRank,
  atUser: state.leaderboard.atUser,
});

const mapDispatchToProps = {
  onLeaderboardScroll,
  getLeaderboardHead,
  extendLeaderboardTop,
  extendLeaderboardBottom,
  getUserRank,
  goToUserPosition,
  leaveUserPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
