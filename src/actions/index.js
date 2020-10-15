import axios from 'axios';

import { authTokenName, requestTimeout } from '../constants';

const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  SEARCH: 'SEARCH',
  FETCH_RESOURCE: 'FETCH_RESOURCE',
  FETCH_RESOURCES: 'FETCH_RESOURCES',
  FETCH_USER: 'FETCH_USER',
  FETCH_USERS: 'FETCH_USERS',
};

export async function createAsyncActionCreator(dispatch, actionName, axiosConfig, successCallback = () => {}, failureCallback = () => {}) {
  try {
    dispatch({ type: `${actionName}_REQUEST` });
    const response = await axios({ ...axiosConfig, timeout: requestTimeout });
    dispatch({ type: `${actionName}_SUCCESS`, payload: { data: response.data, code: response.status } });
    successCallback(response);
  } catch (error) {
    dispatch({ type: `${actionName}_FAILURE`, payload: { message: error.response?.data?.message || error.message || 'No message found', code: error.response?.status || error.code || null } });
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
