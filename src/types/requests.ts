/* -------- State -------- */

import { Code } from './state';

export interface RequestState {
  [id: string]: {
    isLoading: boolean,
    message: string,
    code: Code
  }
}
