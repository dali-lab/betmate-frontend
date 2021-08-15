import { connect } from 'react-redux';
import { RootState } from 'types/state';
import { createWager } from 'store/actionCreators/wagerActionCreators';

import GameOutcomes from './component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createWager })(GameOutcomes);
