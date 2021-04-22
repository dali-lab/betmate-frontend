// import { createBackendAxiosRequest } from 'store/requests';

import { FetchWagerData, DeleteWagerData, Wager } from 'types/resources/wager';
import { RequestReturnType } from 'types/state';

export const createWager = async (gameId: string, amount: number): Promise<RequestReturnType<FetchWagerData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      wager: {
        gameId,
        amount,
        wdl: true,
        odds: 69,
        data: 'win',
        resolved: true,
        _id: 'asd8fh7asdfhasdnfjnsdf',
      },
    },
  } as RequestReturnType<FetchWagerData>;
};

export const fetchWagerById = async (id: string): Promise<RequestReturnType<FetchWagerData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      wager: {
        gameId: 'adsf88as9d7fasdf',
        amount: 2834,
        wdl: true,
        odds: 69,
        data: 'win',
        resolved: true,
        _id: id,
      },
    },
  } as RequestReturnType<FetchWagerData>;
};

export const updateWagerById = async (id: string, fields: Partial<Wager>): Promise<RequestReturnType<FetchWagerData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return {
    data: {
      wager: {
        gameId: 'adsf88as9d7fasdf',
        amount: 2834,
        wdl: true,
        odds: 69,
        data: 'win',
        resolved: true,
        _id: id,
        ...fields,
      },
    },
  } as RequestReturnType<FetchWagerData>;
};

export const deleteWagerById = async (id: string): Promise<RequestReturnType<DeleteWagerData>> => {
  // const result = await createBackendAxiosRequest({
  //   method: 'POST',
  //   url: '/',
  // });

  // // Validation here

  // return result;

  return { data: { id } } as RequestReturnType<DeleteWagerData>;
};
