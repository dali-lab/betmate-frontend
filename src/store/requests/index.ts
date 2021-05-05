import axios, { AxiosRequestConfig } from 'axios';
import { requestTimeout, ROOT_URL } from 'utils/index';
import { RequestReturnType } from 'types/state';

export const createBackendAxiosRequest = async <D>(
  config: AxiosRequestConfig,
): Promise<RequestReturnType<D>> => axios({
<<<<<<< HEAD
  baseURL: `${ROOT_URL}/`,
=======
  baseURL: `${ROOT_URL}`,
>>>>>>> 6770cfde3d0aa4b620eaab14a8bf7bdb72781cbf
  timeout: requestTimeout,
  ...config,
});
