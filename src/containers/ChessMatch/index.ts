import { connect } from 'react-redux';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';

import ChessMatch from 'containers/ChessMatch/component';
import './style.scss';

export default connect(null, { fetchGameById })(ChessMatch);
