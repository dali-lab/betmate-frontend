import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';

import { AuthUserResponseData } from 'types/resources/auth';
import { RequestReturnType } from 'types/state';

export const createUser = async (email: string, password: string, firstName: string, lastName: string): Promise<RequestReturnType<AuthUserResponseData>> => {
  const result = await createBackendAxiosRequest<AuthUserResponseData>({
    method: 'POST',
    url: '/auth/signup',
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });

  // Validation here

  return result;
};

export const signInUser = async (email: string, password: string): Promise<RequestReturnType<AuthUserResponseData>> => {
  const result = await createBackendAxiosRequest<AuthUserResponseData>({
    method: 'POST',
    url: '/auth/signin',
    data: {
      email,
      password,
    },
  });

  // Validation here

  return result;
};

export const jwtSignIn = async (): Promise<RequestReturnType<AuthUserResponseData>> => {
  const result = await createBackendAxiosRequest<AuthUserResponseData>({
    method: 'GET',
    url: '/auth/jwt-signin',
    headers: getBearerTokenHeader(),
  });

  // Validation here

  return result;
};
