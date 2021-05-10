/* eslint-disable import/no-cycle */
import { Empty } from 'types';
import { AsyncAction } from 'types/state';

export interface Player {
  name: string
  elo: number
}

export interface GameOdds {
  white_win: number
  draw: number
  black_win: number
}

export interface Game {
  complete: boolean
  game_status: string
  move_hist: string[]
  player_black: Player
  player_white: Player
  state: string
  time_black: number
  time_white: number
  wagers: string[]
  odds: GameOdds
  _id: string
  created_at: string
  updated_at: string
}

/* -------- State -------- */

export interface GameState {
  games: Record<string, Game>
}

/* -------- Action Types -------- */

export const JOIN_GAME = 'JOIN_GAME'; // ws
export const LEAVE_GAME = 'LEAVE_GAME'; // ws
export const MAKE_MOVE = 'MAKE_MOVE'; // ws
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE'; // ws
export const UPDATE_GAME_ODDS = 'UPDATE_GAME_ODDS'; // ws
export const UPDATE_GAME_END = 'UPDATE_GAME_END'; // ws

export const CREATE_GAME = 'CREATE_GAME';
export const FETCH_GAME = 'FETCH_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const FETCH_GAMES = 'FETCH_GAMES';

export type JoinGameData = { gameId: string }; // ws
export type LeaveGameData = { gameId: string }; // ws
export type MakeMoveData = { gameId: string, boardState: string }; // ws
export type UpdateGameStateData = { gameId: string, state: string, move_hist: string[], time_white: number, time_black: number }; // ws
export type UpdateGameOddsData = { gameId: string, odds: GameOdds };
export type UpdateGameEndData = { gameId: string, completed: boolean, game_status: string };

export type CreateGameRequestData = { state: string };
export type FetchGameRequestData = { id: string };
export type UpdateGameRequestData = { id: string, fields: Partial<Game> };
export type DeleteGameRequestData = { id: string };
export type FetchGamesRequestData = { game_status: string[] };

export type FetchGameData = Game;
export type FetchGamesData = Game[];
export type DeleteGameData = { id: string };

export type JoinGameActions = AsyncAction<typeof JOIN_GAME, JoinGameData, JoinGameData>; // ws
export type LeaveGameActions = AsyncAction<typeof LEAVE_GAME, LeaveGameData, LeaveGameData>; // ws
export type MakeMoveActions = AsyncAction<typeof MAKE_MOVE, Empty, MakeMoveData>; // ws
export type UpdateGameStateActions = AsyncAction<typeof UPDATE_GAME_STATE, UpdateGameStateData>; // ws
export type UpdateGameOddsActions = AsyncAction<typeof UPDATE_GAME_ODDS, UpdateGameOddsData>; // ws
export type UpdateGameEndActions = AsyncAction<typeof UPDATE_GAME_END, UpdateGameEndData>; // ws

export type CreateGameActions = AsyncAction<typeof CREATE_GAME, FetchGameData, CreateGameRequestData>;
export type FetchGameActions = AsyncAction<typeof FETCH_GAME, FetchGameData, FetchGameRequestData>;
export type UpdateGameActions = AsyncAction<typeof UPDATE_GAME, FetchGameData, UpdateGameRequestData>;
export type DeleteGameActions = AsyncAction<typeof DELETE_GAME, DeleteGameData, DeleteGameRequestData>;
export type FetchGamesActions = AsyncAction<typeof FETCH_GAMES, FetchGamesData, FetchGamesRequestData>;

export type GameUpdateActions = UpdateGameStateActions | UpdateGameOddsActions | UpdateGameEndActions;

export type GameActions =
  JoinGameActions | LeaveGameActions | MakeMoveActions | GameUpdateActions |
  CreateGameActions | FetchGameActions | UpdateGameActions | DeleteGameActions | FetchGamesActions;

export type GameActionTypes =
  typeof JOIN_GAME | typeof LEAVE_GAME | typeof MAKE_MOVE | typeof UPDATE_GAME_STATE | typeof UPDATE_GAME_ODDS | typeof UPDATE_GAME_END | typeof FETCH_GAME
  | typeof CREATE_GAME | typeof FETCH_GAME | typeof UPDATE_GAME | typeof DELETE_GAME | typeof FETCH_GAMES;
