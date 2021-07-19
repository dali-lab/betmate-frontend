import { connect } from 'react-redux';

import { RootState } from 'types/state';
import {
  getLeaderboardHead, extendLeaderboardTop, extendLeaderboardBottom, getUserRank, goToUserPosition, leaveUserPosition,
} from 'store/actionCreators/leaderboardActionCreators';
import { loadingSelector } from 'store/actionCreators/requestActionCreators';
import Leaderboard from './component';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  rankings: state.leaderboard.rankings,
  userRank: state.leaderboard.userRank,
  atUser: state.leaderboard.atUser,
  goToUserLoading: loadingSelector(['GOTO_USER_POSITION'], state),
  extendTopLoading: loadingSelector(['EXTEND_LEADERBOARD_TOP'], state),
});

const mapDispatchToProps = {
  getLeaderboardHead,
  extendLeaderboardTop,
  extendLeaderboardBottom,
  getUserRank,
  goToUserPosition,
  leaveUserPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
