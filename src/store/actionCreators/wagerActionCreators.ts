import { Actions } from 'types/state';

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

export const fetchWagers = (): Actions => ({
  type: 'FETCH_WAGERS',
  status: 'REQUEST',
  payload: {},
});
