import { Actions } from 'types/state';

export const getLeaderboardHead = (): Actions => ({
  type: 'FETCH_LEADERBOARD_HEAD',
  status: 'REQUEST',
  payload: {},
});

export const extendLeaderboardTop = (): Actions => ({
  type: 'EXTEND_LEADERBOARD_TOP',
  status: 'REQUEST',
  payload: {},
});

export const extendLeaderboardBottom = (): Actions => ({
  type: 'EXTEND_LEADERBOARD_BOTTOM',
  status: 'REQUEST',
  payload: {},
});

export const getUserRank = (): Actions => ({
  type: 'FETCH_USER_RANK',
  status: 'REQUEST',
  payload: {},
});

export const goToUserPosition = (): Actions => ({
  type: 'GOTO_USER_POSITION',
  status: 'REQUEST',
  payload: {},
});

export const leaveUserPosition = (): Actions => ({
  type: 'LEAVE_USER_POSITION',
  status: 'SUCCESS',
  payload: {},
});
