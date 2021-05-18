import { connect } from 'react-redux';
import { RootState } from 'types/state';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';

import ChatBox from './component';

const mapStateToProps = (state: RootState) => ({
  resolvedWagers: Object.values(state.wager.wagers),
});

export default connect(mapStateToProps, { fetchWagers })(ChatBox);
