import { ActionTypes } from '../actions';

const initialState = {
  data: [],
  numResults: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return Object.assign({}, state, { data: action.payload.results, numResults: action.payload.numResults });
    case ActionTypes.FETCH_RESORUCES:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default reducer;
