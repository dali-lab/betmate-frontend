import axios, { AxiosRequestConfig } from 'axios';
import { requestTimeout, ROOT_URL } from 'utils/index';
import { RequestReturnType } from 'types/state';

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig,
): Promise<RequestReturnType<D>> => axios({
  baseURL: `${ROOT_URL}/`,
  timeout: requestTimeout,
  ...config,
});
