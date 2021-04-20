import { ActionTypes, RootState } from 'types/state';

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will determine if any of the passed actions are loading
 */
export const createLoadingSelector = (actions: ActionTypes[]) => (state: RootState): boolean => {
  return actions.some((action) => state.requests?.[action]?.isLoading === true);
};

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error message associated with the array of actions (if any)
 */
export const createErrorSelector = (actions: ActionTypes[]) => (state: RootState): string[] => {
  return actions.reduce((accum, action) => {
    const message = state.requests?.[action]?.message;
    if (message) return [...accum, message];
    return accum;
  }, []);
};
