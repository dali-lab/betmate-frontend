import { connect } from 'react-redux';

import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchGamesByStatus } from 'store/actionCreators/gameActionCreators';

import { ActionTypes, RootState } from 'types/state';
import Dashboard from './component';

const loadActions: ActionTypes[] = ['FETCH_GAMES'];

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isLoading: loadingSelector(loadActions, state),
  errorMessage: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { fetchGamesByStatus })(Dashboard);
