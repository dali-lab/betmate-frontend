import { connect } from 'react-redux';
import { RootState } from 'types/state';

import NavBar from 'components/NavBar/component';
import './style.scss';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  firstName: state.auth.user?.first_name,
});

export default connect(mapStateToProps, {})(NavBar);
