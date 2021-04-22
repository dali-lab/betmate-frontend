import { call, take, put } from 'redux-saga/effects';

import * as authRequests from 'store/requests/authRequests';
import { getErrorPayload } from 'utils/error';

import { Actions, RequestReturnType } from 'types/state';
import { AuthUserResponseData, AuthUserActions } from 'types/resources/auth';

export function* watchAuthUser() {
  while (true) {
    try {
      const action: AuthUserActions = yield take((a: Actions) => (a.type === 'AUTH_USER' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<AuthUserResponseData> = yield call(authRequests.signInUser, action.payload.email, action.payload.password);
      yield put<Actions>({ type: 'AUTH_USER', payload: { user: response.data.user }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'AUTH_USER', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
