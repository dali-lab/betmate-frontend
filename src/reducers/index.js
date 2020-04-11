// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

// import CountReducer from './count-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  // count: CountReducer,
  auth: AuthReducer,
});

export default rootReducer;
