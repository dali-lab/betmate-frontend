// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import DataReducer from './data-reducer';
import LoadingReducer from './loading-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  loading: LoadingReducer,
});

export default rootReducer;
