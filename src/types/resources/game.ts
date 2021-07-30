/* eslint-disable import/no-cycle */
import { AsyncAction, Action } from 'types/state';

export enum GameStatus {
  NOT_STARTED = 'not_started',
  DRAW = 'draw',
  BLACK_WIN = 'black_win',
  WHITE_WIN = 'white_win',
  IN_PROGRESS = 'in_progress',
}

export interface Player {
  name: string
  elo: number
}

export interface GameOdds {
  white_win: number
  draw: number
  black_win: number
}

export interface AnonMoveWager {
  data: string
  amount: number
}

export interface PoolWagerState {
  options: string[]
  wagers: AnonMoveWager[]
}

export interface Move {
  san: string
  to: string
  from: string
  time: number
  is_white: boolean
}

export interface GameChat {
  gameId: string
  userId: string
  userName: string
  chat: string
}

export interface Game {
  complete: boolean
  game_status: string
  time_format: string
  move_hist: Move[]
  player_black: Player
  player_white: Player
  state: string
  time_black: number
  time_white: number
  odds: GameOdds
  pool_wagers: {
    move: PoolWagerState
  },
  _id: string
  created_at: string
  updated_at: string
}

/* -------- State -------- */

export interface GameState {
  games: Record<string, Game>,
  showModal: Record<string, boolean>,
  chats: GameChat[]
}

/* -------- Action Types -------- */

export const JOIN_GAME = 'JOIN_GAME'; // ws
export const LEAVE_GAME = 'LEAVE_GAME'; // ws
export const START_GAME = 'START_GAME'; // ws
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE'; // ws
export const UPDATE_GAME_ODDS = 'UPDATE_GAME_ODDS'; // ws
export const UPDATE_GAME_END = 'UPDATE_GAME_END'; // ws
export const BROADCAST_POOL_WAGER = 'BROADCAST_POOL_WAGER'; // ws
export const GAME_CHAT = 'GAME_CHAT'; // ws

export const FETCH_GAME = 'FETCH_GAME';
export const FETCH_GAMES = 'FETCH_GAMES';
export const UPDATE_SHOW_MODAL = 'UPDATE_SHOW_MODAL';
export const CLEAR_GAMES = 'CLEAR_GAMES';

export type JoinGameData = { gameId: string }; // ws
export type LeaveGameData = { gameId: string }; // ws
export type StartGameData = { gameId: string, game_status: GameStatus }; // ws
export type UpdateGameStateData = { gameId: string, state: string, move_hist: Move[], time_white: number, time_black: number, pool_wagers: { move: PoolWagerState } }; // ws
export type UpdateGameOddsData = { gameId: string, odds: GameOdds, pool_wagers: { move: PoolWagerState } }; // ws
export type UpdateGameEndData = { gameId: string, complete: boolean, game_status: string }; // ws
export type BroadcastPoolWager = { gameId: string, type: 'move', data: string, amount: number }; // ws
export type GameChatMessage = GameChat;

export type FetchGameRequestData = { id: string };
export type FetchGamesRequestData = { game_status: string[] };

export type FetchGameData = Game;
export type FetchGamesData = Game[];

export type UpdateModalData = { gameId: string, modalState: boolean };

export type JoinGameActions = AsyncAction<typeof JOIN_GAME, JoinGameData, JoinGameData>; // ws
export type LeaveGameActions = AsyncAction<typeof LEAVE_GAME, LeaveGameData, LeaveGameData>; // ws
export type StartGameActions = AsyncAction<typeof START_GAME, StartGameData>; // ws
export type UpdateGameStateActions = AsyncAction<typeof UPDATE_GAME_STATE, UpdateGameStateData>; // ws
export type UpdateGameOddsActions = AsyncAction<typeof UPDATE_GAME_ODDS, UpdateGameOddsData>; // ws
export type UpdateGameEndActions = AsyncAction<typeof UPDATE_GAME_END, UpdateGameEndData>; // ws
export type BroadcastPoolWagerActions = AsyncAction<typeof BROADCAST_POOL_WAGER, BroadcastPoolWager>; // ws
export type GameChatActions = AsyncAction<typeof GAME_CHAT, GameChatMessage, Omit<GameChatMessage, 'userId' | 'userName'>>;

export type FetchGameActions = AsyncAction<typeof FETCH_GAME, FetchGameData, FetchGameRequestData>;
export type FetchGamesActions = AsyncAction<typeof FETCH_GAMES, FetchGamesData, FetchGamesRequestData>;
export type ShowModalActions = Action<typeof UPDATE_SHOW_MODAL, UpdateModalData>;
export type ClearGamesActions = Action<typeof CLEAR_GAMES>;

export type GameUpdateActions = StartGameActions | UpdateGameStateActions | UpdateGameOddsActions | UpdateGameEndActions;

export type GameActions =
  JoinGameActions | LeaveGameActions | GameUpdateActions | ShowModalActions | ClearGamesActions |
  FetchGameActions | FetchGamesActions | BroadcastPoolWagerActions | GameChatActions;

export type GameActionTypes =
  typeof JOIN_GAME | typeof LEAVE_GAME | typeof UPDATE_GAME_STATE | typeof UPDATE_GAME_ODDS | typeof UPDATE_GAME_END | typeof FETCH_GAME |
  typeof FETCH_GAME | typeof START_GAME | typeof FETCH_GAMES | typeof BROADCAST_POOL_WAGER | typeof UPDATE_SHOW_MODAL | typeof CLEAR_GAMES |
  typeof GAME_CHAT;
