import { connect } from 'react-redux';

import { onMoveSelect, onMoveUnselect } from 'store/actionCreators/chessgroundActionCreators';
import { RootState } from 'types/state';

import MoveOptions from './component';
import '../style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

const mapDispatchToProps = {
  onMoveSelect,
  onMoveUnselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveOptions);
