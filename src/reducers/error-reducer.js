// Reference:
// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

const reducer = (state = {}, action) => {
  /**
   * Check if the action name ends in "REQUEST" or "FAILURE"
   */
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(action.type);

  console.log('matches', matches);

  /**
   * The passed action name does not end in "REQUEST" or "FAILURE"
   */
  if (!matches) {
    return state;
  }

  /**
   * There will only be three values within a valid matches array
   * 1) Full action name
   * 2) Action name
   * 3) Matched string within action ("REQUEST", "FAILURE")
   */
  const [, requestName, requestState] = matches;

  /**
   * Keeps track of whether or not the requestName is associated with a request or a failed response
   * Will load the passed error message into the error-reducer from action payload
   * Checks both for a message passed as a part of an object and as plain text (when using some middleware object returns aren't allowed)
   */
  return Object.assign({}, state, { [requestName]: requestState === 'FAILURE' ? action.payload.message : '' });
};

export default reducer;
