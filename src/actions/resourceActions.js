import axios from 'axios';
import ActionTypes, { getBearerTokenHeader } from './index';
import { requestTimeout, ROOT_URL } from '../constants';

/**
 * A function for fetching all resources loaded into backend (or a given number based on backend parameters)
 */
export function fetchResources() {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_RESOURCES_REQUEST });
      const response = await axios.get(`${ROOT_URL}/resources`, { timeout: requestTimeout });
      dispatch({ type: ActionTypes.FETCH_RESOURCES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_RESOURCES_FAILURE, payload: error.response?.data || error });
    }
  };
}

// New resource (AUTH)
export function createResource(title, description, value) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });
      const response = await axios.post(`${ROOT_URL}/resources`, { title, description, value }, { timeout: requestTimeout, headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response?.data || error });
    }
  };
}

// // TODO: Add additional auth to call this
// // Delete all resources (AUTH)
// export function deleteAllResources() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/resources`, { timeout: requestTimeout }).then((response) => {
//       resolve();
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// :id

// Get
export function fetchResourceByID(id) {
  return async (dispatch) => {
    try {
      if (!id) {
        dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: {} });
        return;
      }
      dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });
      const response = await axios.get(`${ROOT_URL}/resources/${id}`, { timeout: requestTimeout });
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response?.data });
    }
  };
}

// Update (AUTH)
export function updateResourceByID(id, update) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_REQUEST });
      const response = await axios.put(`${ROOT_URL}/resources/${id}`, update, { timeout: requestTimeout, headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_RESOURCE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_RESOURCE_FAILURE, payload: error.response?.data });
    }
  };
}

// Delete (AUTH)
// TODO: Update action types
export function deleteResourceByID(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${ROOT_URL}/resources/${id}`, { timeout: requestTimeout, headers: getBearerTokenHeader() });
    } catch (error) {
      console.error(error);
    }
  };
}
