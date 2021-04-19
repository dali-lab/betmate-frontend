// Reference:
// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

import { RequestState } from '../types/requests';
import { Actions } from '../types/state';

const initialState: RequestState = {};

const reducer = (state = initialState, action: Actions): RequestState => {
  /**
   * Keeps track of whether or not the requestName is associated with a request or a response
   * Will assign true to the value of requestName within the loadingReducer if the request has not completed,
   * and false if the request completes. This allows you to check loading through the loadingReducer automatically   *
   */
  const updatedState = {
    ...state,
    [action.type]: {
      isLoading: action.status === 'REQUEST',
      message: action.status === 'FAILURE' ? action.payload?.message ?? '' : '',
      code: action.status === 'FAILURE' ? 200 : '', // action.payload?.code ?? null : null,
    },
  };

  return updatedState;
};

export default reducer;
