import ActionTypes, {
  getBearerTokenHeader, createAsyncActionCreator,
} from '.';
import { ROOT_URL } from '../constants';

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
//       reject();
//     });
//   });
// }

// :id

// Get
export function fetchResourceByID(id) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_RESOURCE,
    {
      method: 'get',
      url: `${ROOT_URL}/resources/${id}`,
    },
  );
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
export function deleteResourceByID(id) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.DELETE_RESOURCE,
    {
      method: 'delete',
      url: `${ROOT_URL}/resources/${id}`,
      headers: getBearerTokenHeader(),
    },
    {
      additionalPayloadFields: { id },
    },
  );
}
