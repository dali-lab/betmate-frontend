import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { getBearerTokenHeader } from './index';

/**
 * A function for fetching all resources loaded into backend (or a given number based on backend parameters)
 */
export function fetchResources() {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_RESOURCES_REQUEST });

    axios.get(`${ROOT_URL}/resources`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCES_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCES_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// New resource (AUTH)
export function createResource(title, description, value) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });

    axios.post(`${ROOT_URL}/resources`, { title, description, value }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// // TODO: Add additional auth to call this
// // Delete all resources (AUTH)
// export function deleteAllResources() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/resources`).then((response) => {
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
    dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });

    axios.get(`${ROOT_URL}/resources/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// Update (AUTH)
export function updateResourceByID(id, update) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });

    axios.put(`${ROOT_URL}/resources/${id}`, { update }, { headers: getBearerTokenHeader() }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// Delete (AUTH)
export function deleteResourceByID(id) {
  return dispatch => new Promise((resolve, reject) => {
    axios.delete(`${ROOT_URL}/resources/${id}`, {}, { headers: getBearerTokenHeader() }).then((response) => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
