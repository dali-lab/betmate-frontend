/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apply } from 'redux-saga/effects';
import { CreateUserActions, JwtSignInActions, SignInUserActions } from 'types/resources/auth';

export function* handleAuthHeap(action: CreateUserActions | SignInUserActions | JwtSignInActions) {
  try {
    if (action.status !== 'SUCCESS') return;
    yield apply(window.heap, window.heap.identify, [action.payload.user._id]);
  } catch (error) {
    console.log(error);
    // maybe retry heap.identify later?
  }
}

export function* handleDeauthHeap() {
  try {
    yield apply(window.heap, window.heap.resetIdentity, []);
  } catch (error) {
    console.log(error);
    // maybe retry heap.resetIdentity later?
  }
}
