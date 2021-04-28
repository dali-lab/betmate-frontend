import { connect } from 'react-redux';

// import { createErrorSelector, createLoadingSelector } from 'store/actionCreators/requestActionCreators';
import { fetchGameById } from 'store/actionCreators/gameActionCreators';

// import { ActionTypes, RootState } from 'types/state';
import Dashboard from 'components/dashboard/dashboard';

// const loadActions: ActionTypes[] = ['AUTH_USER'];

export default connect(null, { fetchGameById })(Dashboard);
