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
        game_id: 'adsf88as9d7fasdf',
        better_id: 'adsf88as9d7fasdf',
        amount: 2834,
        wdl: true,
        odds: 69,
        data: 'win',
        resolved: true,
        status: 'in_progress',
        _id: 'asdf',
        ...{} as Partial<Wager>,
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
        game_id: 'adsf88as9d7fasdf',
        better_id: 'adsf88as9d7fasdf',
        amount: 2834,
        wdl: true,
        odds: 69,
        move_number: 10,
        data: 'win',
        resolved: true,
        status: 'in_progress',
        _id: id,
        ...{} as Partial<Wager>,
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
        game_id: 'adsf88as9d7fasdf',
        better_id: 'adsf88as9d7fasdf',
        amount: 2834,
        wdl: true,
        odds: 69,
        data: 'win',
        resolved: true,
        status: 'in_progress',
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
