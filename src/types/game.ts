import { Empty } from '.';
import { AsyncAction } from './state';

export interface Game {
  state: string,
  _id: string
}

/* -------- State -------- */

export interface GameState extends Game {

}

/* -------- Action Types -------- */

export const JOIN_GAME = 'JOIN_GAME'; // ws
export const MAKE_MOVE = 'MAKE_MOVE'; // ws
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE'; // ws

export const FETCH_GAME = 'FETCH_GAME';
export const FETCH_GAMES = 'FETCH_GAMES';
export const DELETE_GAME = 'DELETE_GAME';

export type JoinGameData = { gameId: string, uid: string }; // ws
export type MakeMoveData = { gameId: string, boardState: string }; // ws
export type UpdateGameStateData = { gameId: string, boardState: string }; // ws

export type FetchGameData = { game: Game };
export type FetchGamesData = { games: Game[] };
export type DeleteGameData = { id: string };

export type JoinGameActions = AsyncAction<typeof JOIN_GAME, JoinGameData>; // ws
export type MakeMoveActions = AsyncAction<typeof MAKE_MOVE, Empty, MakeMoveData>; // ws
export type UpdateGameStateActions = AsyncAction<typeof UPDATE_GAME_STATE, UpdateGameStateData>; // ws

export type FetchGameActions = AsyncAction<typeof FETCH_GAME, FetchGameData>;
export type FetchGamesActions = AsyncAction<typeof FETCH_GAMES, FetchGamesData>;
export type DeleteGameActions = AsyncAction<typeof DELETE_GAME, DeleteGameData>;

export type GameActions = JoinGameActions | MakeMoveActions | UpdateGameStateActions | FetchGameActions | FetchGamesActions | DeleteGameActions;
export type GameActionTypes = typeof JOIN_GAME | typeof MAKE_MOVE | typeof UPDATE_GAME_STATE | typeof FETCH_GAME | typeof FETCH_GAMES | typeof DELETE_GAME;
