import { connect } from 'react-redux';

import { onMoveHover, onMoveUnhover } from 'store/actionCreators/chessgroundActionCreators';
import { RootState } from 'types/state';

import MoveOptions from './component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onMoveHover,
  onMoveUnhover,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveOptions);
