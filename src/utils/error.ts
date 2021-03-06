import { AxiosError } from 'axios';
import { Code } from 'types/state';

export const getErrorPayload = <T = any>(error: Error | AxiosError<T>): { message: string, code: Code } => {
  if ((error as AxiosError).isAxiosError) {
    return ({
      message: (error as AxiosError<{ errors: string[] }>).response?.data?.errors?.join('. ')
      || (error as AxiosError<{ message: string }>).response?.data?.message
      || (error as AxiosError<{ error: string }>).response?.data?.error
      || error.message,
      code: (error as AxiosError).response?.status || (error as AxiosError).code || error.name || null,
    });
  }

  return ({
    message: error.message,
    code: error.name || null,
  });
};
