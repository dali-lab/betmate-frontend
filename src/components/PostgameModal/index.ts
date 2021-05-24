import { connect } from 'react-redux';

import { RootState } from 'types/state';

import PostgameModal from './component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
  wagers: state.wager.wagers,
});

export default connect(mapStateToProps, { })(PostgameModal);
