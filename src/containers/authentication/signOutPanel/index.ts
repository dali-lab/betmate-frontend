import { connect } from 'react-redux';

import SignOutPanel from './component';
import { signOutUser } from '../../../actions/authActions';

export default connect(null, { signOutUser })(SignOutPanel);
