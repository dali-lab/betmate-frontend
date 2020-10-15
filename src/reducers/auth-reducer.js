import ActionTypes from '../actions';

const initialState = {
  authenticated: false,
  user: {},
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.FETCH_USER}_SUCCESS`:
      return { ...state, user: action.payload.data };
    case `${ActionTypes.FETCH_USERS}_SUCCESS`:
      return { ...state, users: action.payload.data };
    case `${ActionTypes.AUTH_USER}_SUCCESS`:
      return { ...state, authenticated: true, user: action.payload.data.user || {} };
    case `${ActionTypes.DEAUTH_USER}_SUCCESS`:
      return {
        ...state, authenticated: false, user: {}, users: [],
      };
    default:
      return state;
  }
};

export default reducer;
