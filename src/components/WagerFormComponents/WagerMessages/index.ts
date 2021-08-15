import { connect } from 'react-redux';
import { ActionTypes, RootState } from 'types/state';
import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';

import SubmitWager from './component';
import '../style.scss';

const loadActions: ActionTypes[] = ['CREATE_WAGER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(loadActions, state),
  errorMessages: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { jwtSignIn })(SubmitWager);
