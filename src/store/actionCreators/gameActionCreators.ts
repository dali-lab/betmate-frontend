import { Game } from 'types/resources/game';
import { Actions } from 'types/state';

export const createGame = (state: string): Actions => ({
  type: 'CREATE_GAME',
  status: 'REQUEST',
  payload: { state },
});

export const fetchGameById = (id: string): Actions => ({
  type: 'FETCH_GAME',
  status: 'REQUEST',
  payload: { id },
});

export const fetchGamesById = (game_status: string): Actions => ({
  type: 'FETCH_GAMES',
  status: 'REQUEST',
  payload: { game_status },
});

export const updateGameById = (id: string, fields: Partial<Game>): Actions => ({
  type: 'UPDATE_GAME',
  status: 'REQUEST',
  payload: { id, fields },
});

export const deleteGameById = (id: string): Actions => ({
  type: 'DELETE_GAME',
  status: 'REQUEST',
  payload: { id },
});
