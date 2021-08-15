import { connect } from 'react-redux';
import { RootState } from 'types/state';

import GameOutcomes from './component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(GameOutcomes);
