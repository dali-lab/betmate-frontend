import { connect } from 'react-redux';

import { onEnterMovePanel, onLeaveMovePanel } from 'store/actionCreators/chessgroundActionCreators';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { RootState } from 'types/state';
import WagerSubPanel from 'components/WagerSubPanel/component';

import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onEnterMovePanel,
  onLeaveMovePanel,
  createWager,
};

export default connect(mapStateToProps, mapDispatchToProps)(WagerSubPanel);
