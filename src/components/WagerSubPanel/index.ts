import { connect } from 'react-redux';
import { createWager } from 'store/actionCreators/wagerActionCreators';

import WagerSubPanel from 'components/WagerSubPanel/component';
import './style.scss';

export default connect(null, { createWager })(WagerSubPanel);
