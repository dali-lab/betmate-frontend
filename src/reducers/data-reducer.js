import { ActionTypes } from '../actions';

const initialState = {
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SEARCH_DATA:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default reducer;
