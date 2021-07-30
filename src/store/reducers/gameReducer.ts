import omit from 'lodash.omit';

import { GameState } from 'types/resources/game';
import { Actions } from 'types/state';

const initialState: GameState = {
  games: {},
  showModal: {},
  chats: [],
};

const gameReducer = (state = initialState, action: Actions): GameState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'FETCH_GAME':
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
            ...omit(action.payload, 'gameId'),
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

    case 'GAME_CHAT':
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };

    case 'LEAVE_GAME':
      return {
        ...state,
        chats: [],
      };

    default:
      return state;
  }
};

export default gameReducer;
