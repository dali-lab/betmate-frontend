import { connect } from 'react-redux';

import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { signInUser } from 'store/actionCreators/authActionCreators';
import { ActionTypes, RootState } from 'types/state';

import SignInPanel from 'containers/authentication/signInPanel/component';
import '../style.scss';

const loadActions: ActionTypes[] = ['SIGN_IN_USER'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(state),
  errorMessages: errorSelector(state),
});

export default connect(mapStateToProps, { signInUser })(SignInPanel);
