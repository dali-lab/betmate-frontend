import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { getBearerTokenHeader } from './index';

// Get all users (AUTH)
export function fetchUsers() {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_USERS_REQUEST });

    axios.get(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USERS_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_USERS_FAILURE });
      reject(error);
    });
  });
}

// New user (AUTH)
export function createUser(title, description, value) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_USER_REQUEST });

    axios.post(`${ROOT_URL}/users`, { title, description, value }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE });
      reject(error);
    });
  });
}

// // TODO: Add additional auth to call this
// // Delete all users (AUTH)
// export function deleteAllUsers() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() }).then((response) => {
//       resolve();
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// Get user by id (AUTH)
export function fetchUserByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_USER_REQUEST });

    axios.get(`${ROOT_URL}/users/${id}`, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE });
      reject(error);
    });
  });
}

// Update by id (AUTH)
export function updateUserByID(id, update) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_USER_REQUEST });

    axios.put(`${ROOT_URL}/users/${id}`, { update }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE });
      reject(error);
    });
  });
}

// Delete by id (AUTH)
export function deleteUserByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    console.log('user id delete', getBearerTokenHeader());
    axios.delete(`${ROOT_URL}/users/${id}`, {}, { headers: getBearerTokenHeader() }).then((response) => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
