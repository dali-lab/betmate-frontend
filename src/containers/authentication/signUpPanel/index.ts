import { connect } from 'react-redux';

import SignUpPanel from 'containers/authentication/signUpPanel/component';

import { signUpUser } from 'store/actionCreators/authActionCreators';
import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';

import { ActionTypes, RootState } from 'types/state';

const loadActions: ActionTypes[] = ['AUTH_USER'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { signUpUser })(SignUpPanel);
