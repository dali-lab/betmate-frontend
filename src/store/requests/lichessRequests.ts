import { createBackendAxiosRequest } from 'store/requests';
import { CreateLichessResponse } from 'types/lichess';

import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { CreateLichessSchema } from 'validation/lichess';

export const createLichessGame = async (url: string): Promise<RequestReturnType<CreateLichessResponse>> => {
  const tryUrl = url.length > 12;
  const result = await createBackendAxiosRequest<CreateLichessResponse>({
    method: 'POST',
    url: `/lichess/${tryUrl ? 'url' : 'id'}`,
    data: tryUrl ? { url } : { id: url },
    timeout: 5000,
  });

  return validateSchema(CreateLichessSchema, result, (d) => d.data);
};
