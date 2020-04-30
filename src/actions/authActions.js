import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { setBearerToken } from './index';

/**
 * Sign up a user and return a user object and a bearer token
 * @param {*} email
 * @param {*} password
 * @param {*} firstName
 * @param {*} lastName
 */
export function signUpUser(email, password, firstName, lastName) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.AUTH_USER_REQUEST });

    axios.post(`${ROOT_URL}/auth/signup`, {
      email, password, firstName, lastName,
    }).then((response) => {
      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: response.data.user });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.AUTH_USER_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

/**
 * A function that takes a username and a password and sends them to the backend server for authentication
 * If authentication succeeds, the provided token will be placed locally and the user's authentication status will be updated
 * @param {*} username
 * @param {*} password
 */
export function signInUser(email, password) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.AUTH_USER_REQUEST });

    axios.post(`${ROOT_URL}/auth/signin`, { email, password }).then((response) => {
      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: response.data.user });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.AUTH_USER_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
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
