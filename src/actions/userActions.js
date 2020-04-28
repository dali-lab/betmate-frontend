import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { getBearerTokenHeader } from './index';

// Get all users (AUTH)
export function fetchUsers() {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// New user (AUTH)
export function createUser(title, description, value) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${ROOT_URL}/users`, { title, description, value }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// // TODO: Add additional auth to call this
// // Delete all users (AUTH)
// export function deleteAllUsers() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() }).then((response) => {
//       console.log(response.data); // TODO: Remove testing console log
//       // dispatch({ type: ActionTypes.FETCH_RESORUCES, payload: response.data });
//       resolve();
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// Get user by id (AUTH)
export function fetchUserByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/users/${id}`, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// Update by id (AUTH)
export function updateUserByID(id, update) {
  return dispatch => new Promise((resolve, reject) => {
    axios.put(`${ROOT_URL}/users/${id}`, { update }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// Delete by id (AUTH)
export function deleteUserByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    axios.delete(`${ROOT_URL}/users/${id}`, { headers: getBearerTokenHeader() }).then((response) => {
      // dispatch({ type: ActionTypes.FETCH_RESORUCES, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
