import { connect } from 'react-redux';
import { RootState } from 'types/state';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';
import { sendGameChat } from 'store/actionCreators/gameActionCreators';

import ChatBox from './component';

const mapStateToProps = (state: RootState) => ({
  resolvedWagers: Object.values(state.wager.wagers),
  chats: state.game.chats,
});

export default connect(mapStateToProps, { fetchWagers, sendGameChat })(ChatBox);
