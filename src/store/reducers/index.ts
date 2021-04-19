// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import RequestReducer from './requestReducer';
import WagerReducer from './wagerReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  request: RequestReducer,
  wager: WagerReducer,
});

export default rootReducer;
