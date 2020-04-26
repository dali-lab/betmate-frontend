import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { setBearerToken } from './index';

// TODO: Sign up
export function signUpUser(email, password, firstName, lastName) {
  // TODO: Connect this to the backend
  return dispatch => new Promise((resolve, reject) => {
    // setBearerToken('DUMMY TOKEN');
    // dispatch({ type: ActionTypes.AUTH_USER });
    // resolve();

    // TODO: Connect to server

    axios.post(`${ROOT_URL}/auth/signup`, {
      email, password, firstName, lastName,
    }).then((response) => {
      console.log('Sign in response:', response);

      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });

      resolve();
    }).catch((error) => {
      console.error(error);
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
  console.log(`Signing in user '${email}' with password '${password}'`);
  // TODO: Connect this to the backend
  return dispatch => new Promise((resolve, reject) => {
    // setBearerToken('DUMMY TOKEN');
    // dispatch({ type: ActionTypes.AUTH_USER });
    // resolve();

    // TODO: Connect to server

    axios.post(`${ROOT_URL}/auth/signin`, { email, password }).then((response) => {
      console.log('Sign in response:', response);

      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });

      resolve();
    }).catch((error) => {
      console.error(error);
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
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
