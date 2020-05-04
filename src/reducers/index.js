// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import DataReducer from './data-reducer';
import ErrorReducer from './error-reducer';
import LoadingReducer from './loading-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  error: ErrorReducer,
  loading: LoadingReducer,
});

export default rootReducer;
