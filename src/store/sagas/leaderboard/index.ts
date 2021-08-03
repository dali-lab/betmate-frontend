/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery } from 'redux-saga/effects';
import { takeRequest, takeSuccess } from '../utils';
import {
  handleExtendLeaderboardBottom, handleExtendLeaderboardTop, handleGetLeaderboardHead, handleGetUserRank, handleGoToUserPosition, handleLeaveUserPosition,
} from './handlers';

export default function* leaderboardSaga() {
  yield takeEvery(takeRequest('FETCH_LEADERBOARD_HEAD'), handleGetLeaderboardHead);
  yield takeEvery(takeRequest('EXTEND_LEADERBOARD_TOP'), handleExtendLeaderboardTop);
  yield takeEvery(takeRequest('EXTEND_LEADERBOARD_BOTTOM'), handleExtendLeaderboardBottom);
  yield takeEvery(takeRequest('FETCH_USER_RANK'), handleGetUserRank);
  yield takeEvery(takeRequest('GOTO_USER_POSITION'), handleGoToUserPosition);
  yield takeEvery(takeSuccess('LEAVE_USER_POSITION'), handleLeaveUserPosition);
}
