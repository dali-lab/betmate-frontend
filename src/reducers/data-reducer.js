import ActionTypes from '../actions';

const initialState = {
  resource: {},
  resources: [],
  numResults: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      return Object.assign({}, state, { resources: action.payload.results, numResults: action.payload.numResults });
    case ActionTypes.FETCH_RESOURCE:
      return Object.assign({}, state, { resource: action.payload });
    case ActionTypes.FETCH_RESOURCES:
      return Object.assign({}, state, { resources: action.payload });
    default:
      return state;
  }
};

export default reducer;
