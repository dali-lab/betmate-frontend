import omit from 'lodash.omit';

import { GameState } from 'types/resources/game';
import { Actions } from 'types/state';

const initialState: GameState = { games: {} };

const gameReducer = (state = initialState, action: Actions): GameState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CREATE_GAME':
    case 'FETCH_GAME':
    case 'UPDATE_GAME':
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload._id]: {
            ...state.games[action.payload._id],
            ...action.payload,
          },
        },
      };

    case 'FETCH_GAMES':
      return {
        ...state,
        games: action.payload.reduce((accum, game) => ({
          ...accum,
          [game._id]: game,
        }), state.games),
      };

    case 'DELETE_GAME':
      return {
        ...state,
        games: omit(state.games, action.payload.id),
      };

    case 'UPDATE_GAME_STATE':
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.gameId]: {
            ...state.games[action.payload.gameId],
            state: action.payload.state,
          },
        },
      };

    default:
      return state;
  }
};

export default gameReducer;
