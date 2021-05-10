import { connect } from 'react-redux';

import { joinRoom, leaveRoom } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { RootState } from 'types/state';
import ChessMatch from './component';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { joinGame: joinRoom, leaveGame: leaveRoom, fetchGameById })(ChessMatch);
