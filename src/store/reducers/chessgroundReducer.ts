import { ChessgroundState } from 'types/chessground';
import { Actions } from 'types/state';
import { moveOptionColors } from 'utils/config';
import { fromToEqual, selectDrawshape } from 'utils/chess';

const initialState: ChessgroundState = {
  config: {
    viewOnly: true,
    highlight: { lastMove: true, check: true },
    drawable: {
      brushes: {
        0: {
          key: 'first', color: moveOptionColors[0], opacity: 1, lineWidth: 10,
        },
        1: {
          key: 'second', color: moveOptionColors[1], opacity: 1, lineWidth: 10,
        },
        2: {
          key: 'third', color: moveOptionColors[2], opacity: 1, lineWidth: 10,
        },
        3: {
          key: 'other', color: moveOptionColors[3], opacity: 1, lineWidth: 10,
        },
      },
    },
  },
  autoShapes: [],
  showAutoShapes: false,
};

const chessgroundReducer = (state = initialState, action: Actions): ChessgroundState => {
  if (action.status !== 'SUCCESS') return state;

  switch (action.type) {
    case 'CG_NEW_MOVE':
      return {
        ...state,
        config: {
          ...state.config,
          fen: action.payload.newState,
          lastMove: action.payload.lastMove ?? [],
          drawable: {
            ...state.config.drawable,
            autoShapes: [],
          },
        },
        autoShapes: [],
        selected: undefined,
      };
    case 'CG_NEW_ARROWS':
      return {
        ...state,
        config: {
          ...state.config,
          drawable: {
            ...state.config.drawable,
            autoShapes: state.showAutoShapes ? action.payload : [],
          },
        },
        autoShapes: action.payload,
        selected: undefined,
      };
    case 'CG_ENTER_MOVE_PANEL':
      return {
        ...state,
        config: {
          ...state.config,
          drawable: {
            ...state.config.drawable,
            autoShapes: state.selected
              ? selectDrawshape(state.autoShapes, state.selected)
              : state.autoShapes,
          },
        },
        showAutoShapes: true,
      };
    case 'CG_LEAVE_MOVE_PANEL':
      return {
        ...state,
        config: {
          ...state.config,
          drawable: {
            ...state.config.drawable,
            autoShapes: state.selected
              ? selectDrawshape(state.autoShapes, state.selected)
              : [],
          },
        },
        showAutoShapes: false,
      };
    case 'CG_MOVE_HOVER':
      return {
        ...state,
        config: {
          ...state.config,
          drawable: {
            ...state.config.drawable,
            autoShapes: state.selected && !fromToEqual(state.selected, action.payload)
              ? [...selectDrawshape(state.autoShapes, state.selected), ...selectDrawshape(state.autoShapes, action.payload)]
              : selectDrawshape(state.autoShapes, action.payload),
          },
        },
      };
    case 'CG_MOVE_UNHOVER':
      return {
        ...state,
        config: {
          ...state.config,
          drawable: {
            ...state.config.drawable,
            autoShapes: state.selected
              ? selectDrawshape(state.autoShapes, state.selected)
              : state.autoShapes,
          },
        },
      };
    default:
      return state;
  }
};

export default chessgroundReducer;
