import { WagerState } from '../../types/wager';
import { Actions } from '../../types/state';

const initialState: WagerState = { wagers: {} };
const wagerReducer = (state = initialState, action: Actions): WagerState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'FETCH_WAGER':
      return {
        ...state,
        wagers: {
          ...state.wagers,
          [action.payload.wager.id || '']: action.payload.wager,
        },
      };
    default:
      return state;
  }
};

export default wagerReducer;
