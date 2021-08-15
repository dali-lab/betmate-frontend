import { connect } from 'react-redux';
import { ActionTypes, RootState } from 'types/state';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { loadingSelector } from 'store/actionCreators/requestActionCreators';

import GameOutcomes from './component';
import '../style.scss';

const loadActions: ActionTypes[] = ['CREATE_WAGER'];

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isLoading: loadingSelector(loadActions, state),
});

export default connect(mapStateToProps, { createWager })(GameOutcomes);
