import joi from 'joi';
import { GameChatMessage } from 'types/resources/game';

export const GameChatSchema = joi.object<GameChatMessage>({
  gameId: joi.string().required(),
  userId: joi.string().required(),
  userName: joi.string().required(),
  chat: joi.string().required(),
  time: joi.string().required(),
});
