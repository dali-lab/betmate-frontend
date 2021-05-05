import { Empty } from 'types';
import { AsyncAction } from 'types/state';

export interface Player {
  name: string,
  elo: number
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
  _id: string
}

/* -------- State -------- */

export interface GameState {
  games: Record<string, Game>
}

/* -------- Action Types -------- */

export const JOIN_GAME = 'JOIN_GAME'; // ws
export const MAKE_MOVE = 'MAKE_MOVE'; // ws
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE'; // ws

export const CREATE_GAME = 'CREATE_GAME';
export const FETCH_GAME = 'FETCH_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const FETCH_GAMES = 'FETCH_GAMES';

export type JoinGameData = { gameId: string, uid: string }; // ws
export type MakeMoveData = { gameId: string, boardState: string }; // ws
export type UpdateGameStateData = { gameId: string, boardState: string }; // ws

export type CreateGameRequestData = { state: string };
export type FetchGameRequestData = { id: string };
export type UpdateGameRequestData = { id: string, fields: Partial<Game> };
export type DeleteGameRequestData = { id: string };
export type FetchGamesRequestData = { game_status: string };

export type FetchGameData = Game;
export type FetchGamesData = Game[];
export type DeleteGameData = { id: string };

export type JoinGameActions = AsyncAction<typeof JOIN_GAME, JoinGameData>; // ws
export type MakeMoveActions = AsyncAction<typeof MAKE_MOVE, Empty, MakeMoveData>; // ws
export type UpdateGameStateActions = AsyncAction<typeof UPDATE_GAME_STATE, UpdateGameStateData>; // ws

export type CreateGameActions = AsyncAction<typeof CREATE_GAME, FetchGameData, CreateGameRequestData>;
export type FetchGameActions = AsyncAction<typeof FETCH_GAME, FetchGameData, FetchGameRequestData>;
export type UpdateGameActions = AsyncAction<typeof UPDATE_GAME, FetchGameData, UpdateGameRequestData>;
export type DeleteGameActions = AsyncAction<typeof DELETE_GAME, DeleteGameData, DeleteGameRequestData>;
export type FetchGamesActions = AsyncAction<typeof FETCH_GAMES, FetchGamesData, FetchGamesRequestData>;

export type GameActions =
  JoinGameActions | MakeMoveActions | UpdateGameStateActions |
  CreateGameActions | FetchGameActions | UpdateGameActions | DeleteGameActions | FetchGamesActions;

export type GameActionTypes =
  typeof JOIN_GAME | typeof MAKE_MOVE | typeof UPDATE_GAME_STATE | typeof FETCH_GAME
  | typeof CREATE_GAME | typeof FETCH_GAME | typeof UPDATE_GAME | typeof DELETE_GAME | typeof FETCH_GAMES;
