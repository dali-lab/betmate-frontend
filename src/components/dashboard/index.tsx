import { connect } from 'react-redux';

import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchGamesById } from 'store/actionCreators/gameActionCreators';

import { ActionTypes, RootState } from 'types/state';
import Dashboard from 'components/dashboard/dashboard';

const loadActions: ActionTypes[] = ['FETCH_GAMES'];
const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isLoading: createLoadingSelector(loadActions)(state),
  errorMessage: createErrorSelector(loadActions)(state),
});

export default connect(mapStateToProps, { fetchGamesById })(Dashboard);
