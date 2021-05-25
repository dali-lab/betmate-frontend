import { connect } from 'react-redux';

import { joinGame, leaveGame } from 'store/actionCreators/websocketActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';
import { RootState } from 'types/state';

import PlayerInfo from './component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  games: state.game.games,
});

export default connect(mapStateToProps, { joinGame, leaveGame, fetchGameById })(PlayerInfo);
