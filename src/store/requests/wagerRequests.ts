import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';

import { FetchWagerData, DeleteWagerData, Wager } from 'types/resources/wager';
import { RequestReturnType } from 'types/state';

export const createWager = async (
  gameId: string,
  wager: string,
  amount: number,
  wdl: boolean,
  odds: number,
  moveNumber: number,
): Promise<RequestReturnType<FetchWagerData>> => {
  const result = await createBackendAxiosRequest<FetchWagerData>({
    method: 'POST',
    url: `/wager/${gameId}`,
    data: {
      wdl,
      amount,
      data: wager,
      odds,
      move_number: moveNumber,
    },
    headers: getBearerTokenHeader(),
    timeout: 5000, // default is 1000ms, but this endpoint has an intentional 1000ms delay + is making an API request
  });

  // // Validation here
  console.log(result);

  return result;
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
      gameId: 'adsf88as9d7fasdf',
      amount: 2834,
      wdl: true,
      odds: 69,
      data: 'win',
      resolved: true,
      _id: id,
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
      gameId: 'adsf88as9d7fasdf',
      amount: 2834,
      wdl: true,
      odds: 69,
      data: 'win',
      resolved: true,
      _id: id,
      ...fields,
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
