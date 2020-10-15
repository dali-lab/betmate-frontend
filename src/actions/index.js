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

export function generateSuccessPayload(response, customParams = {}) {
  return ({ data: response.data, code: response.status, ...customParams });
}

export function generateFailurePayload(error, customParams = {}) {
  return ({ message: error.response?.data?.message || error.message || 'No message found', code: error.response?.status || error.code || null, ...customParams });
}

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
