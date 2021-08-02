import { WagerState } from 'types/resources/wager';
import { Actions } from 'types/state';

const initialState: WagerState = { wagers: {} };

const wagerReducer = (state = initialState, action: Actions): WagerState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CREATE_WAGER':
    case 'FETCH_WAGER':
      return {
        ...state,
        wagers: {
          ...state.wagers,
          [action.payload._id]: action.payload,
        },
      };

    case 'FETCH_WAGERS':
      return {
        ...state,
        wagers: action.payload.reduce((accum, wager) => ({
          ...accum,
          [wager._id]: wager,
        }), state.wagers),
      };

    case 'DEAUTH_USER':
      return {
        ...state,
        wagers: {},
      };
    default:
      return state;
  }
};

export default wagerReducer;
