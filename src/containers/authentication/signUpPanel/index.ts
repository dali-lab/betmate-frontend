import { connect } from 'react-redux';

import { signUpUser } from 'store/actionCreators/authActionCreators';
import { errorSelector, loadingSelector } from 'store/actionCreators/requestActionCreators';
import { ActionTypes, RootState } from 'types/state';

import SignUpPanel from 'containers/authentication/signUpPanel/component';
import '../style.scss';

const loadActions: ActionTypes[] = ['CREATE_USER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(loadActions, state),
  errorMessages: errorSelector(loadActions, state),
});

export default connect(mapStateToProps, { signUpUser })(SignUpPanel);
