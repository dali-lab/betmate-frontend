import omit from 'lodash.omit';

import { GameState } from 'types/resources/game';
import { Actions } from 'types/state';

const initialState: GameState = {
  games: {},
  showPregameModal: {},
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
        showPregameModal: {
          ...state.showPregameModal,
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
        showPregameModal: action.payload.reduce((accum, game) => ({
          [game._id]: true,
          ...accum, // any existing redux data will overwrite the default 'true' option
        }), state.showPregameModal),
      };

    case 'DELETE_GAME':
      return {
        ...state,
        games: omit(state.games, action.payload.id),
        showPregameModal: omit(state.showPregameModal, action.payload.id),
      };

    case 'UPDATE_PREGAME_MODAL':
      return {
        ...state,
        showPregameModal: {
          ...state.showPregameModal,
          [action.payload.gameId]: action.payload.showModal,
        },
      };

    case 'UPDATE_GAME_STATE':
    case 'UPDATE_GAME_ODDS':
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

    default:
      return state;
  }
};

export default gameReducer;
