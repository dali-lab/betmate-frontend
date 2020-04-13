import axios from 'axios';
// import { ROOT_URL } from '../constants';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  FETCH_SEARCH_DATA: 'FETCH_SEARCH_DATA',
};

/**
 * A function that takes a username and a password and sends them to the backend server for authentication
 * If authentication succeeds, the provided token will be placed locally and the user's authentication status will be updated
 * @param {*} username
 * @param {*} password
 */
export function signInUser(username, password) {
  console.log(`Signing in user '${username}' with password '${password}'`);
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

/**
 * A function that fetches data from server and stores it in redux
 * TODO: Add filtering functionality
 * Test URL: "https://jsonplaceholder.typicode.com/posts"
 * @param {*} filters
 */
export function fetchSearchData(filters) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      dispatch({ type: ActionTypes.FETCH_SEARCH_DATA, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
