// import { createBackendAxiosRequest } from 'store/requests';

import { FetchUserData, DeleteUserData, User } from 'types/resources/user';
import { RequestReturnType } from 'types/state';

export const createUser = async (email: string, password: string, firstName: string, lastName: string): Promise<RequestReturnType<FetchUserData>> => {
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
        firstName,
        lastName,
        account: 866798,
        wager_hist: ['8676786'],
        _id: '8ya789gf8d7g8a7sdfgh',
      },
    },
  } as RequestReturnType<FetchUserData>;
};

export const fetchUserById = async (uid: string): Promise<RequestReturnType<FetchUserData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      user: {
        email: 'a8dsf87asbhdf7hasd89fh',
        firstName: 'Bill',
        lastName: 'Bob',
        account: 866798,
        wager_hist: ['8676786'],
        _id: uid,
      },
    },
  } as RequestReturnType<FetchUserData>;
};

export const updateUserById = async (uid: string, fields: Partial<User>): Promise<RequestReturnType<FetchUserData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      user: {
        email: 'a8dsf87asbhdf7hasd89fh',
        firstName: 'Bill',
        lastName: 'Bob',
        account: 866798,
        wager_hist: ['8676786'],
        _id: uid,
        ...fields,
      },
    },
  } as RequestReturnType<FetchUserData>;
};

export const deleteUserById = async (uid: string): Promise<RequestReturnType<DeleteUserData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { uid } } as RequestReturnType<DeleteUserData>;
};
