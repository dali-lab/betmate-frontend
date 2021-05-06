import { connect } from 'react-redux';

import { joinGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { RootState } from 'types/state';
import ChessMatch from './component';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { joinGame, fetchGameById })(ChessMatch);
