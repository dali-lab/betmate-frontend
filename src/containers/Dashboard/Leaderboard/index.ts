import { connect } from 'react-redux';
import { RootState } from 'types/state';
import Leaderboard from './component';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Leaderboard);
