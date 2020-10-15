import axios from 'axios';

import { authTokenName, requestTimeout } from '../constants';

const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  SEARCH: 'SEARCH',

  FETCH_RESOURCE: 'FETCH_RESOURCE',
  FETCH_RESOURCES: 'FETCH_RESOURCES',
  DELETE_RESOURCE: 'DELETE_RESOURCE',

  FETCH_USER: 'FETCH_USER',
  FETCH_USERS: 'FETCH_USERS',
  DELETE_USER: 'DELETE_USER',
};

/**
* Generates valid "success" payload given a response object and additional custom parameters
* * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
* @param {*} response - Axios Response
* @param {*} customParams - Any additional parameters to inject into action.payload
*/
export function generateSuccessPayload(response, customParams = {}) {
  return ({ data: response.data, code: response.status, ...customParams });
}

/**
 * Generates valid "failure" payload given an error object and additional custom parameters
 * * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
 */

/**
 * Generates valid "failure" payload given an error object and additional custom parameters
 * * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
 * @param {*} error - Javascript error object
 * @param {*} customParams - Any additional parameters to inject into action.payload
 */
export function generateFailurePayload(error, customParams = {}) {
  return ({ message: error.response?.data?.message || error.message || 'No message found', code: error.response?.status || error.code || null, ...customParams });
}

/**
 * A function which standardizes the creation of asynchronous action creators. This allows for standardization in the creation and maintenance of reducers.
 * * Note: This function is intended to reduce boilerplate code. If additional customization is needed, see `generateSuccessPayload` and `generateFailurePayload`
 * @param {*} dispatch - Redux dispatch function
 * @param {*} actionName - Name of action to manage (e.g. ActionTypes.FETCH_USER)
 * @param {*} axiosConfig - Standard axios configuration object
 * @param {*} successCallback - Optional callback called after success dispatch
 * @param {*} failureCallback - Optional callback called after failure dispatch
 */
export async function createAsyncActionCreator(dispatch, actionName, axiosConfig, successCallback = () => {}, failureCallback = () => {}) {
  try {
    dispatch({ type: `${actionName}_REQUEST` });
    const response = await axios({ ...axiosConfig, timeout: requestTimeout });
    dispatch({ type: `${actionName}_SUCCESS`, payload: generateSuccessPayload(response) });
    successCallback(response);
  } catch (error) {
    dispatch({ type: `${actionName}_FAILURE`, payload: generateFailurePayload(error) });
    failureCallback(error);
  }
}

// Gets token from localStorage
export function getBearerTokenHeader() {
  return ({ Authorization: `Bearer ${localStorage.getItem(authTokenName)}` });
}

// Sets token in localStorage
export function setBearerToken(token) {
  localStorage.setItem(authTokenName, token);
}

export default ActionTypes;
