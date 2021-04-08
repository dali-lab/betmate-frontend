import ActionTypes, {
  getBearerTokenHeader, createAsyncActionCreator,
} from '.';
import { ROOT_URL } from '../constants';

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
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.DELETE_USER,
    {
      method: 'delete',
      url: `${ROOT_URL}/users/${id}`,
      headers: getBearerTokenHeader(),
    },
    {
      additionalPayloadFields: { id },
    },
  );
}
