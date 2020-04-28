import { authTokenName } from '../constants';

const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',

  // UNUSED, replaced with blanket AUTH_USER
  // SIGNUP_USER: 'SIGNUP_USER',
  // SIGNIN_USER: 'SIGNIN_USER',

  SEARCH: 'SEARCH',

  FETCH_RESOURCE: 'FETCH_RESOURCE',
  FETCH_RESOURCES: 'FETCH_RESOURCES',

  FETCH_USER: 'FETCH_USER',
  FETCH_USERS: 'FETCH_USERS',
};

// Gets token from localStorage
export function getBearerTokenHeader() {
  return ({ Authorization: `Bearer ${localStorage.getItem(authTokenName)}` });
}

// Sets token in localStorage
export function setBearerToken(token) {
  localStorage.setItem(authTokenName, token);
}

export default ActionTypes;
