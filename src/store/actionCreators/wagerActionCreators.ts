import axios from 'axios';
import { ThunkResult } from '../../types/state';

export const fetchWagerById = (id: string): ThunkResult => async (dispatch) => {
  try {
    dispatch({
      type: 'FETCH_WAGER',
      status: 'REQUEST',
      payload: {} as any,
    });
    const response = await axios({ url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'get' });
    console.log('REQUEST DATA', response.data);
    dispatch({
      type: 'FETCH_WAGER',
      status: 'SUCCESS',
      payload: { data: { wager: response.data as any } }, // TODO: change data type
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_WAGER',
      status: 'FAILURE',
      payload: {} as any, // TODO: Update data
    });
  }
};
