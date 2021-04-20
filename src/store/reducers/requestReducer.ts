import { RequestState } from 'types/requests';
import { Actions, Code } from 'types/state';

const initialState: RequestState = {};

const reducer = (state = initialState, action: Actions): RequestState => {
  /**
   * Keeps track of whether or not the requestName is associated with a request or a response
   * Will assign true to the value of requestName within the loadingReducer if the request has not completed,
   * and false if the request completes. This allows you to check loading through the loadingReducer automatically   *
   */
  const updatedState: RequestState = {
    ...state,
    [action.type]: {
      isLoading: action.status === 'REQUEST',
      message: action.status === 'FAILURE' ? (action.payload as { message: string }).message : '',
      code: action.status === 'FAILURE' ? (action.payload as { code: Code }).code ?? null : null,
    },
  };

  return updatedState;
};

export default reducer;
