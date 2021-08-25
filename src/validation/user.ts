import joi from 'joi';
import { User, UserRole } from 'types/resources/auth';

export const isUserRole = (v: string): boolean => Object.values(UserRole).includes(v as UserRole);

const userRoleValidator = (value: any, helpers: joi.CustomHelpers) => (
  isUserRole(value)
    ? value
    : helpers.message({ custom: `Value '${value}' is not a user role` })
);

export const UserSchema = joi.object<User>({
  _id: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }).required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  full_name: joi.string().required(),
  account: joi.number().required(),
  role: joi.string().custom(userRoleValidator),
});
