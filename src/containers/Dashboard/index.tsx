import { connect } from 'react-redux';

import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchGamesByStatus } from 'store/actionCreators/gameActionCreators';

import { ActionTypes, RootState } from 'types/state';
import Dashboard from './component';

const loadActions: ActionTypes[] = ['FETCH_GAMES'];

const mapStateToProps = (state: RootState) => ({
  games: Object.values(state.game.games)
    .filter((game) => game.game_status === 'not_started' || game.game_status === 'in_progress'),
  isLoading: loadingSelector(loadActions, state),
  errorMessage: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { fetchGamesByStatus })(Dashboard);
