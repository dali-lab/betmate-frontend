import { User } from '../../types/auth';
import { ThunkResult } from '../../types/state';
import { getBearerTokenHeader, createAsyncActionCreator } from '.';
import { ROOT_URL } from '../../constants';

// New user (AUTH)
export const createUser = (firstName: string, lastName: string, email: string, password: string): ThunkResult => {
  return (dispatch) => createAsyncActionCreator(
    dispatch, 'CREATE_USER',
    {
      method: 'post',
      url: `${ROOT_URL}/users`,
      data: {
        first_name: firstName, last_name: lastName, email, password,
      },
      headers: getBearerTokenHeader(),
    },
  );
};

// Get user by id (AUTH)
// export const fetchUserByID = (id: string): ThunkResult => {
//   return (dispatch) => {
//     if (!id) {
//       return dispatch({ type: `${ActionTypes.FETCH_USER}_SUCCESS`, payload: {} });
//     } else {
//       return createAsyncActionCreator(
//         dispatch, ActionTypes.FETCH_USER,
//         {
//           method: 'get',
//           url: `${ROOT_URL}/users/${id}`,
//           headers: getBearerTokenHeader(),
//         },
//       );
//     }
//   };
// }

// Update by id (AUTH)
export const updateUserByID = (id: string, update: Partial<User>): ThunkResult => {
  return (dispatch) => createAsyncActionCreator(
    dispatch, 'UPDATE_USER',
    {
      method: 'put',
      url: `${ROOT_URL}/users/${id}`,
      data: update,
      headers: getBearerTokenHeader(),
    },
  );
};

// Delete by id (AUTH)
export const deleteUserByID = (id: string): ThunkResult => {
  return (dispatch) => createAsyncActionCreator(
    dispatch, 'DELETE_USER',
    {
      method: 'delete',
      url: `${ROOT_URL}/users/${id}`,
      headers: getBearerTokenHeader(),
    },
    {
      additionalPayloadFields: { id },
    },
  );
};
