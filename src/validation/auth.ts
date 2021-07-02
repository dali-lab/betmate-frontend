import joi from 'joi';
import { AuthUserResponseData, JwtSignInResponseData } from 'types/resources/auth';

import { UserSchema } from 'validation/user';

export const AuthUserResponseSchema = joi.object<AuthUserResponseData>({
  user: UserSchema.required(),
  token: joi.string().required(),
});

export const JwtSignInResponseSchema = joi.object<JwtSignInResponseData>({
  user: UserSchema.required(),
});
