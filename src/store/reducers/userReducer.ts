import omit from 'lodash.omit';

import { UserState } from 'types/resources/user';
import { Actions } from 'types/state';

const initialState: UserState = {
  users: {},
};

const userReducer = (state = initialState, action: Actions): UserState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'FETCH_USER':
    case 'UPDATE_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user._id]: action.payload.user,
        },
      };

    case 'CREATE_USER':
    case 'SIGN_IN_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.user._id]: action.payload.user,
        },
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: omit(state.users, action.payload.uid),
      };

    default:
      return state;
  }
};

export default userReducer;
