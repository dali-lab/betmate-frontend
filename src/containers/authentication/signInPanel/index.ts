import { connect } from 'react-redux';

import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';
import { signInUser } from 'store/actionCreators/authActionCreators';
import { ActionTypes, RootState } from 'types/state';

import SignInPanel from 'containers/authentication/signInPanel/component';
import '../style.scss';

const loadActions: ActionTypes[] = ['SIGN_IN_USER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(loadActions, state),
  errorMessages: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { signInUser })(SignInPanel);
