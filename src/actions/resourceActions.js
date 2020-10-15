// Axios object reference: https://github.com/axios/axios#request-config

import axios from 'axios';
import ActionTypes, { getBearerTokenHeader, createAsyncActionCreator } from '.';
import { requestTimeout, ROOT_URL } from '../constants';

/**
 * A function for fetching all resources loaded into backend (or a given number based on backend parameters)
 */
export function fetchResources() {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCES,
    {
      method: 'get',
      url: `${ROOT_URL}/resources`,
    },
  );
}

// New resource (AUTH)
export function createResource(title, description, value) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    {
      method: 'post',
      url: `${ROOT_URL}/resources`,
      data: { title, description, value },
      headers: getBearerTokenHeader(),
    },
  );
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
  return (dispatch) => {
    if (!id) {
      return dispatch({ type: `${ActionTypes.FETCH_RESOURCE}_SUCCESS`, payload: {} });
    } else {
      return createAsyncActionCreator(
        dispatch, ActionTypes.FETCH_RESOURCE,
        {
          method: 'get',
          url: `${ROOT_URL}/resources/${id}`,
        },
      );
    }
  };
}

// Update (AUTH)
export function updateResourceByID(id, update) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    {
      method: 'put',
      url: `${ROOT_URL}/resources/${id}`,
      data: update,
      headers: getBearerTokenHeader(),
    },
  );
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
