import joi from 'joi';

import { UserSchema } from 'validation/user';

export const AuthUserResponseSchema = joi.object({
  user: UserSchema.required(),
  token: joi.string().required(),
});

export const JwtSignInResponseSchema = joi.object({
  user: UserSchema.required(),
});
