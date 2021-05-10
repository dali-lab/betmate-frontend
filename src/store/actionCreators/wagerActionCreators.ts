import { Actions } from 'types/state';
import { Wager } from 'types/resources/wager';

export const createWager = (
  gameId: string,
  wager: string,
  amount: number,
  wdl: boolean,
  odds: number,
  moveNumber: number,
): Actions => ({
  type: 'CREATE_WAGER',
  status: 'REQUEST',
  payload: {
    gameId, wager, amount, wdl, odds, moveNumber,
  },
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
