import { Actions } from 'types/state';
import { LeaderboardState } from 'types/leaderboard';

const initialState: LeaderboardState = {
  rankings: [],
  hasMore: false,
  hasMoreUp: false,
  atUser: false,
  userRank: undefined,
  highestRank: undefined,
  lowestRank: undefined,
  _id: undefined,
};

const leaderboardReducer = (state = initialState, action: Actions): LeaderboardState => {
  switch (action.status) {
    case 'SUCCESS':
      switch (action.type) {
        case 'FETCH_LEADERBOARD_HEAD':
          return {
            ...state,
            rankings: action.payload.rankings,
            hasMore: action.payload.rankings_size > action.payload.rankings.length,
            highestRank: 1,
            lowestRank: action.payload.rankings.length,
            _id: action.payload._id,
          };
        case 'EXTEND_LEADERBOARD_TOP':
          return {
            ...state,
            rankings: action.payload.rankings.concat(state.rankings),
            highestRank: action.payload.rankings[0].rank,
          };
        case 'EXTEND_LEADERBOARD_BOTTOM':
          return {
            ...state,
            rankings: state.rankings.concat(action.payload.rankings),
            hasMore: action.payload.rankings_size > action.payload.rankings[action.payload.rankings.length - 1].rank,
            lowestRank: action.payload.rankings[action.payload.rankings.length - 1].rank,
          };
        case 'FETCH_USER_RANK':
          return {
            ...state,
            userRank: action.payload.rank,
          };
        case 'GOTO_USER_POSITION':
          return {
            ...state,
            rankings: action.payload.rankings,
            hasMore: action.payload.rankings_size > action.payload.rankings[action.payload.rankings.length - 1].rank,
            hasMoreUp: action.payload.rankings[0].rank > 1,
            highestRank: action.payload.rankings[0].rank,
            lowestRank: action.payload.rankings[action.payload.rankings.length - 1].rank,
            _id: action.payload._id,
          };
        case 'LEAVE_USER_POSITION':
          return {
            ...state,
            rankings: [],
            hasMoreUp: false,
            atUser: false,
            highestRank: undefined,
            lowestRank: undefined,
          };
        default:
          return state;
      }
    case 'REQUEST':
      switch (action.type) {
        case 'GOTO_USER_POSITION':
          return {
            ...state,
            rankings: [],
            atUser: true,
            highestRank: undefined,
            lowestRank: undefined,
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export default leaderboardReducer;
