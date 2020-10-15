import ActionTypes from '../actions';

const initialState = {
  resource: {},
  resources: [],
  numResults: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.SEARCH}_SUCCESS`:
      return { ...state, resources: action.payload.results, numResults: action.payload.numResults };
    case `${ActionTypes.FETCH_RESOURCE}_SUCCESS`:
      return { ...state, resource: action.payload };
    case `${ActionTypes.FETCH_RESOURCES}_SUCCESS`:
      return { ...state, resources: action.payload };
    default:
      return state;
  }
};

export default reducer;
