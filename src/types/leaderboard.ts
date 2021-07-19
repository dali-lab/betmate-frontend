/* eslint-disable import/no-cycle */
import { Action, AsyncAction } from './state';

/* -------- State -------- */

export interface Rank {
  user_id: string
  user_name: string
  rank: number
  winnings: number
}

export interface LeaderboardSection {
  _id: string
  rankings: Rank[]
  rankings_size: number
}

export interface LeaderboardState {
  rankings: Rank[]
  hasMore: boolean
  hasMoreUp: boolean
  atUser: boolean
  userRank?: number
  highestRank?: number
  lowestRank?: number
  _id?: string
}

/* -------- Action Types -------- */

export const FETCH_LEADERBOARD_HEAD = 'FETCH_LEADERBOARD_HEAD';
export const EXTEND_LEADERBOARD_TOP = 'EXTEND_LEADERBOARD_TOP';
export const EXTEND_LEADERBOARD_BOTTOM = 'EXTEND_LEADERBOARD_BOTTOM';
export const FETCH_USER_RANK = 'FETCH_USER_RANK';
export const GOTO_USER_POSITION = 'GOTO_USER_POSITION';
export const LEAVE_USER_POSITION = 'LEAVE_USER_POSITION';

export type FetchLeaderboardData = LeaderboardSection;
export type FetchUserRankData = Rank;

export type FetchLeaderboardRequest = { start: number, end: number, _id?: string };

export type FetchLeaderboardHeadActions = AsyncAction<typeof FETCH_LEADERBOARD_HEAD, FetchLeaderboardData>;
export type ExtendLeaderboardTopActions = AsyncAction<typeof EXTEND_LEADERBOARD_TOP, FetchLeaderboardData>;
export type ExtendLeaderboardBottomActions = AsyncAction<typeof EXTEND_LEADERBOARD_BOTTOM, FetchLeaderboardData>;
export type FetchUserRankActions = AsyncAction<typeof FETCH_USER_RANK, FetchUserRankData>;
export type GoToUserPositionActions = AsyncAction<typeof GOTO_USER_POSITION, FetchLeaderboardData>;
export type LeaveUserPositionActions = Action<typeof LEAVE_USER_POSITION>;

export type LeaderboardActions =
    FetchLeaderboardHeadActions | ExtendLeaderboardTopActions | ExtendLeaderboardBottomActions |
    FetchUserRankActions | GoToUserPositionActions | LeaveUserPositionActions;

export type LeaderboardActionTypes =
    typeof FETCH_LEADERBOARD_HEAD | typeof EXTEND_LEADERBOARD_TOP | typeof EXTEND_LEADERBOARD_BOTTOM |
    typeof FETCH_USER_RANK | typeof GOTO_USER_POSITION | typeof LEAVE_USER_POSITION;
