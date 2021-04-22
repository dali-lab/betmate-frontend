import { combineReducers } from 'redux';

import authReducer from 'store/reducers/authReducer';
import gameReducer from 'store/reducers/gameReducer';
import requestReducer from 'store/reducers/requestReducer';
import userReducer from 'store/reducers/userReducer';
import wagerReducer from 'store/reducers/wagerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  request: requestReducer,
  user: userReducer,
  wager: wagerReducer,
});

export default rootReducer;
