import joi from 'joi';
import { CreateLichessResponse } from 'types/lichess';

export const CreateLichessSchema = joi.object<CreateLichessResponse>({
  gameId: joi.string().required(),
});
