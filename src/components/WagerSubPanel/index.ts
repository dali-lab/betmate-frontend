import { connect } from 'react-redux';
import { createWager } from 'store/actionCreators/wagerActionCreators';

import WagerSubPanel from 'components/WagerSubPanel/component';
import './style.scss';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { createWager })(WagerSubPanel);
