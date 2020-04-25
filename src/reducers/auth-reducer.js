import ActionTypes from '../actions';

const initialState = {
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false });
    default:
      return state;
  }
};

export default reducer;
