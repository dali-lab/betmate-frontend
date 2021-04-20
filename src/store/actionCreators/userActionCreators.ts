import { Actions } from '../../types/state';
import { User } from '../../types/resources/user';

export const createUser = (firstName: string, lastName: string, email: string, password: string): Actions => ({
  type: 'CREATE_USER',
  status: 'REQUEST',
  payload: {
    email,
    password,
    firstName,
    lastName,
  },
});

export const updateUserById = (uid: string, fields: Partial<User>): Actions => ({
  type: 'UPDATE_USER',
  status: 'REQUEST',
  payload: { uid, fields },
});

export const deleteUserById = (uid: string): Actions => ({
  type: 'DELETE_USER',
  status: 'REQUEST',
  payload: { uid },
});
