import { getBearerTokenHeader } from 'store/actionCreators';
import { createBackendAxiosRequest } from 'store/requests';

import { FetchWagerData, FetchWagersData } from 'types/resources/wager';
import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { WagerArraySchema, WagerSchema } from 'validation/wager';

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

  return validateSchema(WagerSchema, result, (d) => d.data);
};

export const fetchWagerById = async (id: string): Promise<RequestReturnType<FetchWagerData>> => {
  const result = await createBackendAxiosRequest<FetchWagerData>({
    method: 'GET',
    url: `/wager/${id}`,
    headers: getBearerTokenHeader(),
  });

  return validateSchema(WagerSchema, result, (d) => d.data);
};

export const fetchWagers = async (): Promise<RequestReturnType<FetchWagersData>> => {
  const result = await createBackendAxiosRequest<FetchWagersData>({
    method: 'GET',
    url: '/wager',
    headers: getBearerTokenHeader(),
  });

  return validateSchema(WagerArraySchema, result, (d) => d.data);
};
