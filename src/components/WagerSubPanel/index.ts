import { connect } from 'react-redux';
import { ActionTypes, RootState } from 'types/state';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';

import WagerSubPanel from 'components/WagerSubPanel/component';
import './style.scss';
import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';

const loadActions: ActionTypes[] = ['CREATE_WAGER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  games: state.game.games,
  isLoading: loadingSelector(loadActions, state),
  errorMessages: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { createWager, jwtSignIn })(WagerSubPanel);
