import ActionTypes from '../actions';

const initialState = {
  authenticated: false,
  user: {},
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload });
    case ActionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload });
    case ActionTypes.AUTH_USER_SUCCESS:
      return Object.assign({}, state, { authenticated: true, user: action.payload || {} });
    case ActionTypes.DEAUTH_USER_SUCCESS:
      return Object.assign({}, state, { authenticated: false, user: {}, users: [] });
    default:
      return state;
  }
};

export default reducer;
