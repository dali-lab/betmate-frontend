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
import { getErrorPayload } from 'utils/error';

const SECTION_SIZE = 12;

export function* handleGetLeaderboardHead(action: FetchLeaderboardHeadActions) {
  try {
    if (action.status !== 'REQUEST') return;

    const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, 0, SECTION_SIZE);

    yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
  } catch (error) {
    yield put<Actions>({ type: action.type, status: 'FAILURE', payload: getErrorPayload(error) });
  }
}

export function* handleExtendLeaderboardTop(action: ExtendLeaderboardTopActions) {
  try {
    if (action.status !== 'REQUEST') return;

    const leaderboard: LeaderboardState = yield select((state: RootState) => state.leaderboard);
    const { highestRank, id } = leaderboard;

    if (!highestRank || highestRank <= 1) return;
    const start = Math.max(highestRank - SECTION_SIZE - 1, 0);
    const end = highestRank - 1;

    const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end, id);

    const payload = { ...response.data, ...action.payload };

    yield put<Actions>({ type: action.type, status: 'SUCCESS', payload });
  } catch (error) {
    yield put<Actions>({ type: action.type, status: 'FAILURE', payload: getErrorPayload(error) });
  }
}

export function* handleExtendLeaderboardBottom(action: ExtendLeaderboardBottomActions) {
  try {
    if (action.status !== 'REQUEST') return;

    const leaderboard: LeaderboardState = yield select((state: RootState) => state.leaderboard);
    const { lowestRank, hasMore, id } = leaderboard;

    if (!hasMore || !lowestRank) return;
    const start = lowestRank;
    const end = lowestRank + SECTION_SIZE;

    const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end, id);

    yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
  } catch (error) {
    yield put<Actions>({ type: action.type, status: 'FAILURE', payload: getErrorPayload(error) });
  }
}

export function* handleGetUserRank(action: FetchUserRankActions) {
  try {
    if (action.status !== 'REQUEST') return;

    const response: RequestReturnType<Rank> = yield call(getLeaderboardRank);

    yield put<Actions>({ type: action.type, status: 'SUCCESS', payload: response.data });
  } catch (error) {
    yield put<Actions>({ type: action.type, status: 'FAILURE', payload: getErrorPayload(error) });
  }
}

export function* handleGoToUserPosition(action: GoToUserPositionActions) {
  try {
    if (action.status !== 'REQUEST') return;

    const leaderboard: LeaderboardState = yield select((state: RootState) => state.leaderboard);
    const { userRank, id } = leaderboard;

    if (!userRank) return;
    const halfSection = Math.round(SECTION_SIZE / 2);
    const start = Math.max(userRank - halfSection, 0);
    const end = userRank + halfSection;

    const response: RequestReturnType<LeaderboardSection> = yield call(getLeaderboardSection, start, end, id);

    const payload = { ...response.data, ...action.payload };

    yield put<Actions>({ type: action.type, status: 'SUCCESS', payload });
  } catch (error) {
    yield put<Actions>({ type: action.type, status: 'FAILURE', payload: getErrorPayload(error) });
  }
}

export function* handleLeaveUserPosition(action: LeaveUserPositionActions) {
  if (action.status !== 'SUCCESS') return;
  yield put<Actions>({ type: 'FETCH_LEADERBOARD_HEAD', status: 'REQUEST', payload: {} });
}
