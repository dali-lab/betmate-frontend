import { createBackendAxiosRequest } from 'store/requests';

import { AuthUserResponseData } from 'types/resources/auth';
import { RequestReturnType } from 'types/state';

export const createUser = async (email: string, password: string, firstName: string, lastName: string): Promise<RequestReturnType<AuthUserResponseData>> => {
  const result = await createBackendAxiosRequest({
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

  return result as RequestReturnType<AuthUserResponseData>;
};

export const signInUser = async (email: string, password: string): Promise<RequestReturnType<AuthUserResponseData>> => {
  const result = await createBackendAxiosRequest({
    method: 'POST',
    url: '/auth/signin',
    data: {
      email,
      password,
    },
  });

  // Validation here

  return result as RequestReturnType<AuthUserResponseData>;
};
