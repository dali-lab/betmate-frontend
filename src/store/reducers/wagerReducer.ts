import omit from 'lodash.omit';

import { WagerState } from '../../types/resources/wager';
import { Actions } from '../../types/state';

const initialState: WagerState = { wagers: {} };
const wagerReducer = (state = initialState, action: Actions): WagerState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CREATE_WAGER':
    case 'FETCH_WAGER':
    case 'UPDATE_WAGER':
      return {
        ...state,
        wagers: {
          ...state.wagers,
          [action.payload.wager.id]: action.payload.wager,
        },
      };

    case 'FETCH_WAGERS':
      return {
        ...state,
        wagers: action.payload.wagers.reduce((accum, wager) => ({
          ...accum,
          [wager.id]: wager,
        }), state.wagers),
      };

    case 'DELETE_WAGER':
      return {
        ...state,
        wagers: omit(state.wagers, action.payload.wager.id),
      };

    default:
      return state;
  }
};

export default wagerReducer;
