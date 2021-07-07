import joi from 'joi';
import {
  AnonMoveWager,
  Game,
  GameOdds,
  Move,
  Player,
  PoolWagerState,
  StartGameData,
  UpdateGameEndData,
  UpdateGameOddsData,
  UpdateGameStateData,
} from 'types/resources/game';
import { GameStatus } from 'utils/chess';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chess = require('chess.js');

export const isGameStatus = (v: string): boolean => Object.values(GameStatus).includes(v as GameStatus);

const chessValidator = (value: any, helpers: joi.CustomHelpers) => {
  // eslint-disable-next-line new-cap
  const { valid, error } = Chess().validate_fen(value);
  return valid
    ? value
    : helpers.message({ custom: error });
};

const gameStatusValidator = (value: any, helpers: joi.CustomHelpers) => (
  isGameStatus(value)
    ? value
    : helpers.message({ custom: `Value '${value}' is not a game status` })
);

const PlayerSchema = joi.object<Player>({
  name: joi.string().required(),
  elo: joi.number().required(),
});

const MoveSchema = joi.object<Move>({
  san: joi.string().required(),
  to: joi.string().required(),
  from: joi.string().required(),
  time: joi.number().min(0).required(),
  is_white: joi.boolean().required(),
});

export const GameOddsSchema = joi.object<GameOdds>({
  white_win: joi.number().min(0).max(1).required(),
  draw: joi.number().min(0).max(1).required(),
  black_win: joi.number().min(0).max(1).required(),
});

export const AnonMoveWagerSchema = joi.object<AnonMoveWager>({
  data: joi.string().required(),
  amount: joi.number().min(0).required(),
});

const PoolWagerSchema = joi.object<Record<string, PoolWagerState>>({
  move: joi.object({
    options: joi.array().items(joi.string()).required(),
    wagers: joi.array().items(AnonMoveWagerSchema).required(),
  }),
});

export const GameSchema = joi.object<Game>({
  _id: joi.string().required(),
  complete: joi.boolean().required(),
  game_status: joi.string().custom(gameStatusValidator).required(),
  time_format: joi.string().required(),
  move_hist: joi.array().items(MoveSchema).required(),
  player_white: PlayerSchema.required(),
  player_black: PlayerSchema.required(),
  state: joi.string().custom(chessValidator).required(),
  time_black: joi.number().min(0).required(),
  time_white: joi.number().min(0).required(),
  odds: GameOddsSchema.required(),
  pool_wagers: PoolWagerSchema.required(),
  created_at: joi.string().isoDate().required(),
  updated_at: joi.string().isoDate().required(),
});

export const GameArraySchema = joi.array().items(GameSchema);

export const StartGameSchema = joi.object<StartGameData>({
  gameId: joi.string().required(),
  game_status: joi.string().custom(gameStatusValidator).required(),
});

export const UpdateGameStateSchema = joi.object<UpdateGameStateData>({
  gameId: joi.string().required(),
  state: joi.string().custom(chessValidator).required(),
  move_hist: joi.array().items(MoveSchema).required(),
  time_black: joi.number().min(0).required(),
  time_white: joi.number().min(0).required(),
  pool_wagers: PoolWagerSchema.required(),
});

export const UpdateGameOddsSchema = joi.object<UpdateGameOddsData>({
  gameId: joi.string().required(),
  odds: GameOddsSchema.required(),
  pool_wagers: PoolWagerSchema.required(),
});

export const UpdateGameEndSchema = joi.object<UpdateGameEndData>({
  gameId: joi.string().required(),
  complete: joi.boolean().required(),
  game_status: joi.string().custom(gameStatusValidator).required(),
});
