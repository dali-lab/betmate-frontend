import { createBackendAxiosRequest } from 'store/requests';

import {
  DeleteGameData, FetchGameData, FetchGamesData, Game,
} from 'types/resources/game';
import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { GameSchema, GameArraySchema } from 'validation/game';

export const createGame = async (state: string): Promise<RequestReturnType<FetchGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: { _id: 'asdfjhasdfiuasidufh', state }, status: 100, statusText: 'Aasasasa', headers: {}, config: {},
  } as RequestReturnType<FetchGameData>;
};

export const fetchGameById = async (id: string): Promise<RequestReturnType<FetchGameData>> => {
  const result = await createBackendAxiosRequest<FetchGameData>({
    method: 'GET',
    url: `/chess/${id}`,
  });

  // Validation here
  return validateSchema(GameSchema, result, (d) => d.data);
};

export const fetchGamesByStatus = async (game_status: string[]): Promise<RequestReturnType<FetchGamesData>> => {
  const result = await createBackendAxiosRequest<FetchGamesData>({
    method: 'GET',
    url: '/chess/',
    params: { game_status },
  });
  // Validation here
  return validateSchema(GameArraySchema, result, (d) => d.data);
};

export const updateGameById = async (id: string, fields: Partial<Game>): Promise<RequestReturnType<FetchGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { _id: id, state: 'asdfhasdf', ...fields } } as RequestReturnType<FetchGameData>;
};

export const deleteGameById = async (id: string): Promise<RequestReturnType<DeleteGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { id } } as RequestReturnType<DeleteGameData>;
};
