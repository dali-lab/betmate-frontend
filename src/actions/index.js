import axios from 'axios';
import { ROOT_URL } from '../constants';

// keys for actiontypes
export const ActionTypes = {
  // INCREMENT: 'INCREMENT',
  // DECREMENT: 'DECREMENT',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  FETCH_SEARCH_DATA: 'FETCH_SEARCH_DATA',
};

export function signInUser({ username, password }) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${ROOT_URL}/`, { username, password }).then((response) => {
      console.log('Sign in response:', response);
      localStorage.setItem('authToken', 'Token Value');
      dispatch({ type: ActionTypes.AUTH_USER });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

export function signOutUser() {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}

/**
 * A function that fetches data from server and stores it in redux
 * TODO: Add filtering functionality
 * @param {*} filters
 */
export function fetchSearchData(filters) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      console.log('Fetch response:', response);
      dispatch({ type: ActionTypes.FETCH_SEARCH_DATA, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// export function increment() {
//   return {
//     type: ActionTypes.INCREMENT,
//     payload: null,
//   };
// }

// export function decrement() {
//   return {
//     type: ActionTypes.DECREMENT,
//     payload: null,
//   };
// }
