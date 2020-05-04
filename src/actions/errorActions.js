/**
 * A function to manually set an error message in the error redux store
 * @param {*} action
 * @param {*} errorMessage
 */
export function setError(action, errorMessage) {
  return (dispatch) => {
    return dispatch({ type: `${action}_FAILURE`, payload: { message: errorMessage } });
  };
}

/**
 * A function to manually clear an error from the redux store
 * @param {*} action
 */
export function clearError(action) {
  return (dispatch) => {
    return dispatch({ type: `${action}_CLEAR_ERR`, payload: { message: '' } });
  };
}

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error message associated with the array of actions (if any)
 */
export const createErrorSelector = actions => (state) => {
  // actions not passed as an array
  if (!Array.isArray(actions)) { return () => null; }

  // Returns the first found error message
  let test = actions.map(action => state.error[action] || '');

  test = test.filter(message => message !== '');
  return test[0] || '';
};
