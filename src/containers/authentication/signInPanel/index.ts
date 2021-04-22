import { connect } from 'react-redux';

import SignInPanel from 'containers/authentication/signInPanel/component';

import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { signInUser } from 'store/actionCreators/authActionCreators';

import { ActionTypes, RootState } from 'types/state';

const loadActions: ActionTypes[] = ['AUTH_USER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: createLoadingSelector(loadActions)(state),
  errorMessage: createErrorSelector(loadActions)(state),
});

export default connect(mapStateToProps, { signInUser })(SignInPanel);
