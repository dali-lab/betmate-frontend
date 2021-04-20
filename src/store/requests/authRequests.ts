// import { createBackendAxiosRequest } from 'store/requests';

import { AuthUserResponseData } from 'types/resources/auth';
import { RequestReturnType } from 'types/state';

export const signInUser = async (email: string, password: string): Promise<RequestReturnType<AuthUserResponseData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      user: {
        email,
        password,
        account: 548441,
        wager_hist: ['asdfhasdkjf'],
        _id: 'asdfasgdfsdfkh',
      },
    },
  } as RequestReturnType<AuthUserResponseData>;
};
