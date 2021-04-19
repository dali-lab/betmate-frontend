import { connect } from 'react-redux';

import SignOutPanel from './component';
import { signOutUser } from '../../../store/actionCreators/authActions';

export default connect(null, { signOutUser })(SignOutPanel);
