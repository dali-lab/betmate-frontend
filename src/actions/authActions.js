import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes from './index';

// TODO: Sign up

/**
 * A function that takes a username and a password and sends them to the backend server for authentication
 * If authentication succeeds, the provided token will be placed locally and the user's authentication status will be updated
 * @param {*} username
 * @param {*} password
 */
export function signInUser(username, password) {
  console.log(`Signing in user '${username}' with password '${password}'`);
  // TODO: Connect this to the backend
  return dispatch => new Promise((resolve, reject) => {
    localStorage.setItem('authToken', 'Token Value');
    dispatch({ type: ActionTypes.AUTH_USER });
    resolve();

    // TODO: Connect to server

    // axios.post(`${ROOT_URL}/`, { username, password }).then((response) => {
    //   console.log('Sign in response:', response);
    //   localStorage.setItem('authToken', 'Token Value');
    //   dispatch({ type: ActionTypes.AUTH_USER });
    //   resolve();
    // }).catch((error) => {
    //   console.error(error);
    //   reject(error);
    // });
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
