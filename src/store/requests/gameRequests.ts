// import { createBackendAxiosRequest } from 'store/requests';

import { DeleteGameData, FetchGameData, Game } from 'types/resources/game';
import { RequestReturnType } from 'types/state';

export const createGame = async (state: string): Promise<RequestReturnType<FetchGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { game: { _id: 'asdfjhasdfiuasidufh', state } } } as RequestReturnType<FetchGameData>;
};

export const fetchGameById = async (id: string): Promise<RequestReturnType<FetchGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { game: { _id: id, state: 'asdfhasdf' } } } as RequestReturnType<FetchGameData>;
};

export const updateGameById = async (id: string, fields: Partial<Game>): Promise<RequestReturnType<FetchGameData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { game: { _id: id, state: 'asdfhasdf', ...fields } } } as RequestReturnType<FetchGameData>;
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
