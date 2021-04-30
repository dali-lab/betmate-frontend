import { connect } from 'react-redux';

import { signUpUser } from 'store/actionCreators/authActionCreators';
import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { ActionTypes, RootState } from 'types/state';

import SignUpPanel from 'containers/authentication/signUpPanel/component';
import './style.scss';

const loadActions: ActionTypes[] = ['CREATE_USER'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { signUpUser })(SignUpPanel);
