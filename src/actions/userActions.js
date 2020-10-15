import axios from 'axios';
import ActionTypes, {
  getBearerTokenHeader, createAsyncActionCreator, generateSuccessPayload, generateFailurePayload,
} from '.';
import { ROOT_URL, requestTimeout } from '../constants';

// Get all users (AUTH)
export function fetchUsers() {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_USERS,
    {
      method: 'get',
      url: `${ROOT_URL}/users`,
      headers: getBearerTokenHeader(),
    },
  );
}

// New user (AUTH)
export function createUser(firstName, lastName, email, password) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_USER,
    {
      method: 'post',
      url: `${ROOT_URL}/users`,
      data: {
        first_name: firstName, last_name: lastName, email, password,
      },
      headers: getBearerTokenHeader(),
    },
  );
}

// // TODO: Add additional auth to call this
// // Delete all users (AUTH)
// // TODO: UPDATE THIS ACTION
// export function deleteAllUsers() {
//   return async (dispatch) => {
//     await axios.delete(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() });
//   };
// }

// Get user by id (AUTH)
export function fetchUserByID(id) {
  return (dispatch) => {
    if (!id) {
      return dispatch({ type: `${ActionTypes.FETCH_USER}_SUCCESS`, payload: {} });
    } else {
      return createAsyncActionCreator(
        dispatch, ActionTypes.FETCH_USER,
        {
          method: 'get',
          url: `${ROOT_URL}/users/${id}`,
          headers: getBearerTokenHeader(),
        },
      );
    }
  };
}

// Update by id (AUTH)
export function updateUserByID(id, update) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_USER,
    {
      method: 'put',
      url: `${ROOT_URL}/users/${id}`,
      data: update,
      headers: getBearerTokenHeader(),
    },
  );
}

// Delete by id (AUTH)
export function deleteUserByID(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: `${ActionTypes.DELETE_USER}_REQUEST` });
      const response = await axios.delete(`${ROOT_URL}/resources/${id}`, { timeout: requestTimeout, headers: getBearerTokenHeader() });
      dispatch({ type: `${ActionTypes.DELETE_USER}_SUCCESS`, payload: generateSuccessPayload(response, { id }) });
    } catch (error) {
      dispatch({ type: `${ActionTypes.DELETE_USER}_FAILURE`, payload: generateFailurePayload(error) });
    }
  };
}
