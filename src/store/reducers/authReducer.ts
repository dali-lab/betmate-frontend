import { AuthState } from 'types/resources/auth';
import { Actions } from 'types/state';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state = initialState, action: Actions): AuthState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CREATE_USER':
    case 'SIGN_IN_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case 'DEAUTH_USER':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
