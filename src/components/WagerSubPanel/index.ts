import { connect } from 'react-redux';

import { onEnterMovePanel, onLeaveMovePanel } from 'store/actionCreators/chessgroundActionCreators';
import { RootState } from 'types/state';
import WagerSubPanel from 'components/WagerSubPanel/component';

import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

const mapDispatchToProps = {
  onEnterMovePanel,
  onLeaveMovePanel,
};

export default connect(mapStateToProps, mapDispatchToProps)(WagerSubPanel);
