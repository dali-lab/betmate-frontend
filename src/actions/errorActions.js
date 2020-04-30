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
