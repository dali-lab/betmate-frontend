import { connect } from 'react-redux';
import { RootState } from 'types/state';

import WagerPanel from 'components/WagerPanel/component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  balance: state.auth.user?.account,
  games: state.game.games,
});

export default connect(mapStateToProps, {})(WagerPanel);
