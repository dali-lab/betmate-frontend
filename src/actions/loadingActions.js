/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will determine if any of the passed actions are loading
 */
// eslint-disable-next-line import/prefer-default-export
export const createLoadingSelector = actions => (state) => {
  // actions not passed as an array
  if (!Array.isArray(actions)) { return () => true; }

  // Returns true only if all passed actions aren't loading
  return actions.some(action => state.loading[action] === true);
};

export default createLoadingSelector;
