/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  call, put, select,
} from 'redux-saga/effects';
import { getLeaderboardRank, getLeaderboardSection } from 'store/requests/leaderboardRequests';
import {
  ExtendLeaderboardBottomActions,
  ExtendLeaderboardTopActions,
  FetchLeaderboardHeadActions,
  FetchUserRankActions,
  GoToUserPositionActions,
  LeaderboardSection,
  LeaderboardState,
  LeaveUserPositionActions,
  Rank,
} from 'types/leaderboard';
import { Actions, RequestReturnType, RootState } from 'types/state';

export function* handleGetLeaderboardHead(action: FetchLeaderboardHeadActions) {
  if (action.status !== 'REQUEST') return;

  const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, 0, 10);

  yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
}

export function* handleExtendLeaderboardTop(action: ExtendLeaderboardTopActions) {
  if (action.status !== 'REQUEST') return;

  console.log('extending leaderboard');

  const highestRank: number = yield select((state: RootState) => state.leaderboard.highestRank);

  console.log(highestRank);

  if (highestRank && highestRank <= 1) return;
  const start = Math.max(highestRank - 11, 0);
  const end = highestRank - 1;

  const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end);

  yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
}

export function* handleExtendLeaderboardBottom(action: ExtendLeaderboardBottomActions) {
  if (action.status !== 'REQUEST') return;

  const leaderboard: LeaderboardState = yield select((state: RootState) => state.leaderboard);
  const { lowestRank, hasMore } = leaderboard;

  if (!hasMore || !lowestRank) return;
  const start = lowestRank + 1;
  const end = lowestRank + 11;

  const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end);

  yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
}

export function* handleGetUserRank(action: FetchUserRankActions) {
  if (action.status !== 'REQUEST') return;

  const response: RequestReturnType<Rank> = yield call(getLeaderboardRank);

  yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
}

export function* handleGoToUserPosition(action: GoToUserPositionActions) {
  if (action.status !== 'REQUEST') return;

  const userRank = yield select((state: RootState) => state.leaderboard.userRank);

  if (!userRank) return;
  const start = userRank - 5;
  const end = userRank + 5;

  const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end);

  yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
}

export function* handleLeaveUserPosition(action: LeaveUserPositionActions) {
  if (action.status !== 'SUCCESS') return;
  yield put<Actions>({ type: 'FETCH_LEADERBOARD_HEAD', status: 'REQUEST', payload: {} });
}
