import { connect } from 'react-redux';
import SignOutPanel from 'containers/authentication/signOutPanel/component';
import { signOutUser } from 'store/actionCreators/authActionCreators';

export default connect(null, { signOutUser })(SignOutPanel);
