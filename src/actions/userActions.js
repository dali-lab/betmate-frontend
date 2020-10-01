import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { getBearerTokenHeader } from './index';

// Get all users (AUTH)
export function fetchUsers() {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_USERS_REQUEST });
      const response = await axios.get(`${ROOT_URL}/users`, { headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_USERS_FAILURE, payload: error.response.data });
    }
  };
}

// New user (AUTH)
export function createUser(firstName, lastName, email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_USER_REQUEST });
      const response = await axios.post(`${ROOT_URL}/users`, {
        firstName, lastName, email, password,
      }, { headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE, payload: error.response.data });
    }
  };
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
  return async (dispatch) => {
    try {
      if (!id) {
        dispatch({ type: ActionTypes.FETCH_USER, payload: {} });
        return;
      }

      dispatch({ type: ActionTypes.FETCH_USER_REQUEST });
      const response = await axios.get(`${ROOT_URL}/users/${id}`, { headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE, payload: error.response.data });
    }
  };
}

// Update by id (AUTH)
export function updateUserByID(id, update) {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_USER_REQUEST });
      const response = await axios.put(`${ROOT_URL}/users/${id}`, update, { headers: getBearerTokenHeader() });
      dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_USER_FAILURE, payload: error.response.data });
    }
  };
}

// Delete by id (AUTH)
// TODO: Update action types
export function deleteUserByID(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${ROOT_URL}/users/${id}`, { headers: getBearerTokenHeader() });
    } catch (error) {
      console.error(error);
    }
  };
}
