// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

// import CountReducer from './count-reducer';
import AuthReducer from './auth-reducer';
import DataReducer from './data-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
});

export default rootReducer;
