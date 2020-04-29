// Reference:
// https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

const reducer = (state = {}, action) => {
  /**
   * Check if the action name ends in "REQUEST", "SUCCESS", OR "FAILURE"
   */
  const matches = /(.*)(REQUEST|SUCCESS|FAILURE)/.exec(action.type);

  /**
   * The passed action name does not end in "REQUEST", "SUCCESS", OR "FAILURE"
   */
  if (!matches) {
    return state;
  }

  /**
   * There will only be three values within a valid matches array
   * 1) Full action name
   * 2) Beginning of action name
   * 3) Matched string within action ("REQUEST", "SUCCESS", "FAILURE")
   */
  const [, requestName, requestState] = matches;

  /**
   * Keeps track of whether or not the requestName is associated with a request or a response
   * Will assign true to the value of requestName within the loadingReducer if the request has not completed,
   * and false if the request completes. This allows you to check loading through the loadingReducer automatically   *
   */
  return Object.assign({}, state, { [requestName]: requestState === 'REQUEST' });
};

export default reducer;
