import ActionTypes, { createAsyncActionCreator } from '.';
import { ROOT_URL } from '../constants';

/**
 * A function that fetches data from server and stores it in redux
 * @param {*} query - Search string
 * @param {*} filters - Filters applied - UNIMPLEMENTED
 * @param {*} sort - 'a' -> ascending, 'd' -> descending
 * @param {*} page - Which page of results (calculated in backend) to display?
 * @param {*} numPerPage - How many results should the backend return per query?
 */
// eslint-disable-next-line import/prefer-default-export
export function search(query, filters, sort, page, numPerPage) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.SEARCH,
    {
      method: 'get',
      url: `${ROOT_URL}/search?query=${query && query.split(' ').length > 0
        ? query.split(' ').join('+') : query || ''}&filters=${filters || ''}&sort=${sort || 'a'}&page=${page || 1}&numperpage=${numPerPage || 100}`,
    },
  );
}
