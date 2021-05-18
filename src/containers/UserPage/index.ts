import { connect } from 'react-redux';
import { RootState } from 'types/state';
import { fetchWagers } from 'store/actionCreators/wagerActionCreators';

import UserPage from './component';

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  wagers: state.wager.wagers,
});

export default connect(mapStateToProps, { fetchWagers })(UserPage);
