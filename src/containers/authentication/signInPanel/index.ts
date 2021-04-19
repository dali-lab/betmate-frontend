import { connect } from 'react-redux';
import { ActionTypes, RootState } from '../../../types/state';
import {
  createErrorSelector, createLoadingSelector, setError, clearError,
} from '../../../store/actionCreators/requestActions';
import { signInUser } from '../../../store/actionCreators/authActions';
import SignInPanel from './component';

// Import loading state and error messages of specified actions from redux state
const loadActions: ActionTypes[] = ['AUTH_USER'];

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: createLoadingSelector(loadActions)(state),
  errorMessage: createErrorSelector(loadActions)(state),
});

export default connect(mapStateToProps, { signInUser, setError, clearError })(SignInPanel);
