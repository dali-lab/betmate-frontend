import axios from 'axios';
import ActionTypes, { setBearerToken } from './index';
import { requestTimeout, ROOT_URL } from '../constants';

/**
 * Sign up a user and return a user object and a bearer token
 * @param {*} email
 * @param {*} password
 * @param {*} firstName
 * @param {*} lastName
 */
export function signUpUser(email, password, firstName, lastName) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.AUTH_USER_REQUEST });

      const response = await axios.post(`${ROOT_URL}/auth/signup`, {
        email, password, firstName, lastName,
      }, { timeout: requestTimeout });

      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({ type: ActionTypes.AUTH_USER_FAILURE, payload: error.response.data });
    }
  };
}

/**
 * A function that takes a username and a password and sends them to the backend server for authentication
 * If authentication succeeds, the provided token will be placed locally and the user's authentication status will be updated
 * @param {*} username
 * @param {*} password
 */
export function signInUser(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.AUTH_USER_REQUEST });

      const response = await axios.post(`${ROOT_URL}/auth/signin`, { email, password }, { timeout: requestTimeout });
      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({ type: ActionTypes.AUTH_USER_FAILURE, payload: error.response.data });
    }
  };
}

/**
 * A function that clears a user's authentication status
 */
export function signOutUser() {
  return (dispatch) => {
    localStorage.clear();

    // Run any additional deauth processes here (dispatch DEAUTH_USER_REQUEST if async)

    dispatch({ type: ActionTypes.DEAUTH_USER_SUCCESS });
  };
}
