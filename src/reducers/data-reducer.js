import { ActionTypes } from '../actions';

const initialState = {
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default reducer;
