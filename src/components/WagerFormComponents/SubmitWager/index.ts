import { connect } from 'react-redux';
import { ActionTypes, RootState } from 'types/state';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';

import SubmitWager from 'components/wagerFormComponents/SubmitWager/component';
import '../style.scss';

const loadActions: ActionTypes[] = ['CREATE_WAGER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  games: state.game.games,
  isLoading: loadingSelector(loadActions, state),
  errorMessages: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { createWager, jwtSignIn })(SubmitWager);
