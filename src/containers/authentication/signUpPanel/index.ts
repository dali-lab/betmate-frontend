import { connect } from 'react-redux';

import SignUpPanel from './component';
import { signUpUser } from '../../../store/actionCreators/authActions';
import {
  createErrorSelector, setError, clearError, createLoadingSelector,
} from '../../../store/actionCreators/requestActions';
import { ActionTypes, RootState } from '../../../types/state';

// Import loading state and error messages of specified actions from redux state
const loadActions: ActionTypes[] = ['AUTH_USER'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

export default connect(mapStateToProps, { signUpUser, setError, clearError })(SignUpPanel);
