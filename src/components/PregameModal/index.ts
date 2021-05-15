import { connect } from 'react-redux';

import { RootState } from 'types/state';
import { updatePregameModal } from 'store/actionCreators/gameActionCreators';

import PregameModal from './component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { updatePregameModal })(PregameModal);