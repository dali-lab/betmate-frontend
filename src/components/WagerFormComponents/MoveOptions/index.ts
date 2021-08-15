import { connect } from 'react-redux';

import { onMoveHover, onMoveUnhover } from 'store/actionCreators/chessgroundActionCreators';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { RootState } from 'types/state';

import MoveOptions from './component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

const mapDispatchToProps = {
  onMoveHover,
  onMoveUnhover,
  createWager,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveOptions);
