import { connect } from 'react-redux';

import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { newMove, createNewArrows } from 'store/actionCreators/chessgroundActionCreators';
import { RootState } from 'types/state';

import ChessMatch from './component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  showModal: state.game.showModal,
  config: state.chessground.config,
});

const mapDispatchToProps = {
  joinGame,
  leaveGame,
  fetchGameById,
  newMove,
  createNewArrows,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessMatch);
