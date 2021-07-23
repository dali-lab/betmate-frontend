import joi from 'joi';
import { User } from 'types/resources/user';

export const UserSchema = joi.object<User>({
  _id: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }).required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  full_name: joi.string().required(),
  account: joi.number().required(),
});
