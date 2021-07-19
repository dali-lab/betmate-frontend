import { Actions, ActionTypes } from 'types/state';

export const takeRequest = (...ats: ActionTypes[]) => (a: Actions): boolean => (
  ats.some((at) => a.type === at && a.status === 'REQUEST')
);

export const takeSuccess = (...ats: ActionTypes[]) => (a: Actions): boolean => (
  ats.some((at) => a.type === at && a.status === 'SUCCESS')
);
