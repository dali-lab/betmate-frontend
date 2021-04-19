import { IWager, WagerState } from '../types/wager';
import { Actions } from '../types/state';

const initialState: WagerState = { wagers: {} };
const wagerReducer = (state = initialState, action: Actions): WagerState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'FETCH_WAGER':
      return {
        ...state,
        wagers: {
          ...state.wagers,
          [action.payload?.data.wager.id || '']: action.payload?.data.wager || {} as IWager,
        },
      };
    default:
      return state;
  }
};

export default wagerReducer;
