/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery } from 'redux-saga/effects';
import { takeSuccess } from '../utils';
import { handleAuthHeap, handleDeauthHeap } from './handlers';

export default function* heapSaga() {
  yield takeEvery(takeSuccess('CREATE_USER', 'SIGN_IN_USER', 'JWT_SIGN_IN'), handleAuthHeap);
  yield takeEvery(takeSuccess('DEAUTH_USER'), handleDeauthHeap);
}
