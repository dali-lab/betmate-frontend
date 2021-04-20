import { Actions } from '../../types/state';
import { Wager } from '../../types/resources/wager';

export const createWager = (gameId: string, amount: number): Actions => ({
  type: 'CREATE_WAGER',
  status: 'REQUEST',
  payload: { gameId, amount },
});

export const fetchWagerById = (id: string): Actions => ({
  type: 'FETCH_WAGER',
  status: 'REQUEST',
  payload: { id },
});

export const updateWagerById = (id: string, fields: Partial<Wager>): Actions => ({
  type: 'UPDATE_WAGER',
  status: 'REQUEST',
  payload: { id, fields },
});

export const deleteWagerById = (id: string): Actions => ({
  type: 'DELETE_WAGER',
  status: 'REQUEST',
  payload: { id },
});
