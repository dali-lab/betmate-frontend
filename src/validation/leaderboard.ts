import joi from 'joi';
import { LeaderboardSection, Rank } from 'types/leaderboard';

export const RankSchema = joi.object<Rank>({
  user_id: joi.string().required(),
  user_name: joi.string().required(),
  rank: joi.number().min(1).required(),
  winnings: joi.number().required(),
});

export const LeaderboardSchema = joi.object<LeaderboardSection>({
  _id: joi.string().required(),
  rankings: joi.array().items(RankSchema).required(),
  rankings_size: joi.number().min(0).required(),
});
