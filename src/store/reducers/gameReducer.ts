import omit from 'lodash.omit';

import { GameState } from 'types/resources/game';
import { Actions } from 'types/state';

const initialState: GameState = {
  games: {},
  showModal: {},
};

const gameReducer = (state = initialState, action: Actions): GameState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CREATE_GAME':
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload._id]: {
            ...state.games[action.payload._id],
            ...action.payload,
          },
        },
        showModal: {
          ...state.showModal,
          [action.payload._id]: true,
        },
      };
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
        showModal: action.payload.reduce((accum, game) => ({
          ...accum,
          [game._id]: state.showModal[game._id] ?? true,
        }), state.showModal),
      };

    case 'DELETE_GAME':
      return {
        ...state,
        games: omit(state.games, action.payload.id),
      };

    case 'CLEAR_GAMES':
      return {
        ...state,
        games: {},
      };

    case 'START_GAME':
    case 'UPDATE_GAME_ODDS':
    case 'UPDATE_GAME_STATE':
    case 'UPDATE_GAME_END':
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.gameId]: {
            ...state.games[action.payload.gameId],
            ...action.payload,
          },
        },
      };

    case 'UPDATE_SHOW_MODAL':
      return {
        ...state,
        showModal: {
          ...state.showModal,
          [action.payload.gameId]: action.payload.modalState,
        },
      };

    case 'BROADCAST_POOL_WAGER':
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.gameId]: {
            ...state.games[action.payload.gameId],
            pool_wagers: {
              ...state.games[action.payload.gameId].pool_wagers,
              [action.payload.type]: {
                ...state.games[action.payload.gameId].pool_wagers[action.payload.type],
                wagers: [
                  ...state.games[action.payload.gameId].pool_wagers[action.payload.type].wagers,
                  { data: action.payload.data, amount: action.payload.amount },
                ],
              },
            },
          },
        },
      };

    default:
      return state;
  }
};

export default gameReducer;
