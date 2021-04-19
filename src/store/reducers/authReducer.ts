import { AuthState } from '../../types/auth';
import { Actions } from '../../types/state';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state = initialState, action: Actions): AuthState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, isAuthenticated: true, user: action.payload.data.user };
    case 'DEAUTH_USER':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default reducer;
