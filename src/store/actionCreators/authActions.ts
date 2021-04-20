// import { ThunkResult } from '../../types/state';
// import { createAsyncActionCreator, setBearerToken } from '.';
// import { requestTimeout, ROOT_URL } from '../../constants';

export const signInUser = (...args: any) => { };
export const signOutUser = (...args: any) => { };
export const signUpUser = (...args: any) => { };

// /**
//  * Sign up a user and return a user object and a bearer token
//  * @param {*} email
//  * @param {*} password
//  * @param {*} firstName
//  * @param {*} lastName
//  */
// export const signUpUser = (email: string, password: string, firstName: string, lastName: string): ThunkResult => {
//   return (dispatch) => createAsyncActionCreator(
//     dispatch, 'AUTH_USER',
//     {
//       method: 'post',
//       url: `${ROOT_URL}/auth/signup`,
//       data: {
//         email, password, firstName, lastName,
//       },
//     },
//     {
//       successCallback: (response) => { if (response.data.token) { setBearerToken(response.data.token); } },
//       responseSubfield: 'user',
//     },
//   );
// };

// /**
//  * A function that takes a username and a password and sends them to the backend server for authentication
//  * If authentication succeeds, the provided token will be placed locally and the user's authentication status will be updated
//  * @param {*} username
//  * @param {*} password
//  */
// export const signInUser = (email: string, password: string): ThunkResult => {
//   return (dispatch) => createAsyncActionCreator(
//     dispatch, 'AUTH_USER',
//     {
//       method: 'post',
//       url: `${ROOT_URL}/auth/signin`,
//       data: { email, password },
//       timeout: requestTimeout,
//     },
//     {
//       successCallback: (response) => { if (response.data.token) { setBearerToken(response.data.token); } },
//       responseSubfield: 'user',
//     },
//   );
// };

// /**
//  * A function that clears a user's authentication status
//  */
// export const signOutUser = (): ThunkResult => {
//   return (dispatch) => {
//     localStorage.clear();

//     // Run any additional deauth processes here (dispatch DEAUTH_USER_REQUEST if async)
//     dispatch({ type: 'DEAUTH_USER', status: 'SUCCESS', payload: { data: {} } });
//   };
// };
