import { Actions } from 'types/state';

export const fetchGameById = (id: string): Actions => ({
  type: 'FETCH_GAME',
  status: 'REQUEST',
  payload: { id },
});

export const fetchGamesByStatus = (game_status: string[]): Actions => ({
  type: 'FETCH_GAMES',
  status: 'REQUEST',
  payload: { game_status },
});

export const updateShowModal = (gameId: string, modalState: boolean): Actions => ({
  type: 'UPDATE_SHOW_MODAL',
  status: 'SUCCESS',
  payload: { gameId, modalState },
});

export const clearGames = (): Actions => ({
  type: 'CLEAR_GAMES',
  status: 'SUCCESS',
  payload: {},
});
