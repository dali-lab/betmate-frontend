import { combineReducers } from 'redux';

import authReducer from 'store/reducers/authReducer';
import chessgroundReducer from 'store/reducers/chessgroundReducer';
import gameReducer from 'store/reducers/gameReducer';
import leaderboardReducer from 'store/reducers/leaderboardReducer';
import requestReducer from 'store/reducers/requestReducer';
import userReducer from 'store/reducers/userReducer';
import wagerReducer from 'store/reducers/wagerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  chessground: chessgroundReducer,
  game: gameReducer,
  leaderboard: leaderboardReducer,
  requests: requestReducer,
  user: userReducer,
  wager: wagerReducer,
});

export default rootReducer;
