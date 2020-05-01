import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { getBearerTokenHeader } from './index';

/**
 * A function for fetching all resources loaded into backend (or a given number based on backend parameters)
 */
export function fetchResources() {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/resources`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCES, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// New resource (AUTH)
export function createResource(title, description, value) {
  return dispatch => new Promise((resolve, reject) => {
    axios.post(`${ROOT_URL}/resources`, { title, description, value }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// // TODO: Add additional auth to call this
// // Delete all resources (AUTH)
// export function deleteAllResources() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/resources`).then((response) => {
//       console.log(response.data); // TODO: Remove testing console log
//       // dispatch({ type: ActionTypes.FETCH_RESORUCES, payload: response.data });
//       resolve();
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// :id

// Get
export function fetchResourceByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    axios.get(`${ROOT_URL}/resources/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// Update (AUTH)
export function updateResourceByID(id, update) {
  return dispatch => new Promise((resolve, reject) => {
    axios.put(`${ROOT_URL}/resources/${id}`, update, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

// Delete (AUTH)
export function deleteResourceByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    axios.delete(`${ROOT_URL}/resources/${id}`, { headers: getBearerTokenHeader() }).then((response) => {
      // dispatch({ type: ActionTypes.FETCH_RESORUCES, payload: response.data });
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
