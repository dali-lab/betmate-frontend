import { connect } from 'react-redux';
import { createWager } from 'store/actionCreators/wagerActionCreators';

import { RootState } from 'types/state';
import { updateShowModal } from '../../store/actionCreators/gameActionCreators';

import PregameModal from './component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateShowModal, createWager })(PregameModal);
