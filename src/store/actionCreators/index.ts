import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {
  ActionPayload, ActionTypes, FailurePayload,
} from '../../types/state';
import { authTokenName, requestTimeout } from '../../constants';

/**
* Generates valid "success" payload given a response object and additional custom parameters
* * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
* @param {*} response - Axios Response
* @param {*} customParams - Any additional parameters to inject into action.payload
* @param {*} subField - A subfield of `response.data` to send as the `data` field of the payload
*/
export const generateSuccessPayload = (response: AxiosResponse, customParams = {}, subField = ''): ActionPayload => {
  return ({ data: subField ? response.data[subField] : response.data, code: response.status, ...customParams });
};

/**
 * Generates valid "failure" payload given an error object and additional custom parameters
 * * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
 * @param {*} error - Javascript error object
 * @param {*} customParams - Any additional parameters to inject into action.payload
 */
export const generateFailurePayload = (error: Error, customParams = {}): FailurePayload => {
  return ({ message: error.message || 'No message found', ...customParams });
};

/**
 * A function which standardizes the creation of asynchronous action creators. This allows for standardization in the creation and maintenance of reducers.
 * * Note: This function is intended to reduce boilerplate code. If additional customization is needed, see `generateSuccessPayload` and `generateFailurePayload`
 * @param {*} dispatch - Redux dispatch function
 * @param {*} actionName - Name of action to manage (e.g. ActionTypes.FETCH_USER)
 * @param {*} axiosConfig - Standard axios configuration object (https://github.com/axios/axios#request-config)
 * @param {*} config - Config object containing additional configuration fields
 *
 * Optional `config` fields:
 * * `successCallback` - Function called on success of request (passed request object)
 * * `failureCallback` - Function called on failure of request (passed error object)
 * * `additionalPayloadFields` - Additional fields to include on top level of success action payload (e.g. object id for deleting resource)
 * * `responseSubfield` - Loads `response.data[subfield]` into success payload instead of `response.data`
 */
export const createAsyncActionCreator = async (dispatch: Dispatch, actionName: ActionTypes, axiosConfig: AxiosRequestConfig, config = {} as any): Promise<void> => {
  try {
    dispatch({ type: actionName, status: 'REQUEST' });
    const response = await axios({ ...axiosConfig, timeout: requestTimeout });
    dispatch({ type: actionName, status: 'SUCCESS', payload: generateSuccessPayload(response, config?.additionalPayloadFields || {}, config?.responseSubfield || '') });
    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    dispatch({ type: actionName, status: 'FAILURE', payload: generateFailurePayload(error) });
    if (config.failureCallback) { config.failureCallback(error); }
  }
};

/**
 * Gets the site-stored authToken from localStorage and returns it in the form of an authorization header
 */
export const getBearerTokenHeader = (): { Authorization: string } => ({ Authorization: `Bearer ${localStorage.getItem(authTokenName)}` });

/**
 * Sets a returned token in localStorage for attachment to later network requests
 * @param {*} token - A valid JWT authentication token
 */
export const setBearerToken = (token: string): void => {
  localStorage.setItem(authTokenName, token);
};
