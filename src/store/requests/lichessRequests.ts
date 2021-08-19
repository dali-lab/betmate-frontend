import { createBackendAxiosRequest } from 'store/requests';
import { CreateLichessResponse } from 'types/lichess';

import { RequestReturnType } from 'types/state';
import { validateSchema } from 'validation';
import { CreateLichessSchema, urlRegex } from 'validation/lichess';

export const createLichessGame = async (url: string): Promise<RequestReturnType<CreateLichessResponse>> => {
  const tryUrl = urlRegex.test(url);
  const result = await createBackendAxiosRequest<CreateLichessResponse>({
    method: 'POST',
    url: `/lichess/${tryUrl ? 'url' : 'id'}`,
    data: tryUrl ? { url } : { id: url },
    timeout: 5000,
  });

  return validateSchema(CreateLichessSchema, result, (d) => d.data);
};
