import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchGamesByStatus } from 'store/actionCreators/gameActionCreators';

import { ActionTypes, RootState } from 'types/state';
import Dashboard from './component';

const loadActions: ActionTypes[] = ['FETCH_GAMES'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { fetchGamesByStatus })(withRouter(Dashboard));
