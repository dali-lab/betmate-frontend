import joi from 'joi';
import { WagerStatus } from 'types/resources/wager';

export const isWagerStatus = (v: string): boolean => Object.values(WagerStatus).includes(v as WagerStatus);

const wagerStatusValidator = (value: any, helpers: joi.CustomHelpers) => {
  const sanitizedValue = (Array.isArray(value) ? value : Array(value)).map(String);
  return sanitizedValue.every(isWagerStatus)
    ? sanitizedValue
    : helpers.message({ custom: `The values '${sanitizedValue.filter((v) => !isWagerStatus(v))}' are not wager statuses` });
};

export const WagerSchema = joi.object({
  _id: joi.string().required(),
  game_id: joi.string().required(),
  better_id: joi.string().required(),
  wdl: joi.boolean().required(),
  amount: joi.number().min(0).required(),
  odds: joi.number().min(1).required(),
  data: joi.string().required(),
  move_number: joi.number().min(0).required(),
  resolved: joi.boolean().required(),
  status: joi.string().custom(wagerStatusValidator).required(),
  winning_pool_share: joi.number().min(1).required(),
  created_at: joi.string().required(), // verify is date
  updated_at: joi.string().required(), // verify is date
});

export const WagerArraySchema = joi.array().items(WagerSchema);
