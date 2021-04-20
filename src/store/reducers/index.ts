import { combineReducers } from 'redux';

import AuthReducer from 'store/reducers/authReducer';
import RequestReducer from 'store/reducers/requestReducer';
import WagerReducer from 'store/reducers/wagerReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  request: RequestReducer,
  wager: WagerReducer,
});

export default rootReducer;
