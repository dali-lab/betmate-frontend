// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import ResourceReducer from './resource-reducer';
import RequestReducer from './request-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  resource: ResourceReducer,
  request: RequestReducer,
});

export default rootReducer;
