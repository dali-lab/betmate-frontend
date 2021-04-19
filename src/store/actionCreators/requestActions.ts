import { ErrorData } from '../../types/requests';
import { Action, ActionTypes, RootState } from '../../types/state';

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will determine if any of the passed actions are loading
 */
export const createLoadingSelector = (actions: ActionTypes[]) => (state: RootState): boolean => {
  // Returns true only if all passed actions aren't loading
  return actions.some((action) => state.requests?.[action]?.isLoading === true);
};

/**
 * A function to manually set an error message in the error redux store
 * @param {*} action
 * @param {*} errorMessage
 */
export const setError = (action: ActionTypes, errorMessage: string): Action<ActionTypes, ErrorData> => ({ type: action, status: 'FAILURE', payload: { data: { message: errorMessage } } });

/**
 * A function to manually clear an error from the redux store
 * @param {*} action
 */
export const clearError = (action: ActionTypes): Action<ActionTypes, ErrorData> => ({ type: action, status: 'CLEAR_ERR', payload: { data: { message: '' } } });

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error message associated with the array of actions (if any)
 */
export const createErrorSelector = (actions: ActionTypes[]) => (state: RootState): string => {
  // Returns the first found error message
  return actions.reduce((accum, action) => {
    const message = state.requests?.[action]?.message;
    if (message) return [...accum, message];
    return accum;
  }, [])[0] || '';
};
