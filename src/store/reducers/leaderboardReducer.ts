import { Actions } from 'types/state';
import { LeaderboardState } from 'types/leaderboard';
import { getFirstRank, getLastRank } from 'utils/leaderboard';

const initialState: LeaderboardState = {
  rankings: [],
  position: 0,
  hasMore: false,
  atUser: false,
  userRank: undefined,
  highestRank: undefined,
  lowestRank: undefined,
  id: undefined,
};

const leaderboardReducer = (state = initialState, action: Actions): LeaderboardState => {
  if (action.status === 'REQUEST' && action.type === 'GOTO_USER_POSITION') {
    return {
      ...state,
      rankings: [],
      atUser: true,
      highestRank: undefined,
      lowestRank: undefined,
    };
  }
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'ON_LEADERBOARD_SCROLL':
      return {
        ...state,
        position: action.payload.position,
      };
    case 'FETCH_LEADERBOARD_HEAD':
      return {
        ...state,
        rankings: action.payload.rankings,
        hasMore: action.payload.rankings_size > action.payload.rankings.length,
        highestRank: 1,
        lowestRank: action.payload.rankings.length,
        id: action.payload._id,
      };
    case 'EXTEND_LEADERBOARD_TOP':
      return {
        ...state,
        rankings: action.payload.rankings.concat(state.rankings),
        position: action.payload.rowSize * action.payload.rankings.length,
        highestRank: action.payload.rankings[0].rank,
      };
    case 'EXTEND_LEADERBOARD_BOTTOM':
      return {
        ...state,
        rankings: state.rankings.concat(action.payload.rankings),
        hasMore: action.payload.rankings_size > getLastRank(action.payload.rankings),
        lowestRank: getLastRank(action.payload.rankings),
      };
    case 'FETCH_USER_RANK':
      return {
        ...state,
        userRank: action.payload.rank,
      };
    case 'DEAUTH_USER':
      return {
        ...state,
        userRank: undefined,
      };
    case 'GOTO_USER_POSITION':
      return {
        ...state,
        rankings: action.payload.rankings,
        position: action.payload.rowSize * 2,
        hasMore: action.payload.rankings_size > getLastRank(action.payload.rankings),
        highestRank: getFirstRank(action.payload.rankings),
        lowestRank: getLastRank(action.payload.rankings),
      };
    case 'LEAVE_USER_POSITION':
      return {
        ...state,
        rankings: [],
        atUser: false,
        highestRank: undefined,
        lowestRank: undefined,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
