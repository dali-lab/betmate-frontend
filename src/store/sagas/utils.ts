import { Actions, ActionTypes, RequestStatus } from 'types/state';

const takeStatus = (s: RequestStatus) => (...ats: ActionTypes[]) => (a: Actions): boolean => (
  ats.some((at) => a.type === at && a.status === s)
);

export const takeRequest = takeStatus('REQUEST');

export const takeSuccess = takeStatus('SUCCESS');
