import joi from 'joi';

export const UserSchema = joi.object({
  _id: joi.string().required(),
  id: joi.string().required(),
  email: joi.string().required(), // include email
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  full_name: joi.string().required(),
  account: joi.number().required(),
});
