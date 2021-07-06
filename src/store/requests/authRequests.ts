import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';

import { JwtSignInResponseData, AuthUserResponseData } from 'types/resources/auth';
import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { AuthUserResponseSchema, JwtSignInResponseSchema } from 'validation/auth';

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
  return validateSchema(AuthUserResponseSchema, result, (d) => d.data);
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
  return validateSchema(AuthUserResponseSchema, result, (d) => d.data);
};

export const jwtSignIn = async (): Promise<RequestReturnType<JwtSignInResponseData>> => {
  const result = await createBackendAxiosRequest<JwtSignInResponseData>({
    method: 'GET',
    url: '/auth/jwt-signin',
    headers: getBearerTokenHeader(),
  });

  // Validation here
  return validateSchema(JwtSignInResponseSchema, result, (d) => d.data);
};
