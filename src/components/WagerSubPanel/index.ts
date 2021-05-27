import { connect } from 'react-redux';
import { createWager } from 'store/actionCreators/wagerActionCreators';
import { RootState } from 'types/state';

import WagerSubPanel from 'components/WagerSubPanel/component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { createWager })(WagerSubPanel);
