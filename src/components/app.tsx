import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import { signInUser, signOutUser } from 'store/actionCreators/authActionCreators';
import { initializeSocket } from 'store/actionCreators/websocketActionCreators';

import SignUpPanel from 'containers/authentication/signUpPanel';
import SignInPanel from 'containers/authentication/signInPanel';
import SignOutPanel from 'containers/authentication/signOutPanel';
import { ROOT_URL } from 'utils';
import Dashboard from './dashboard';
import ChessMatch from './chessMatch';
import NavBar from './NavBar';

const Welcome = () => {
  return (
    <div>
      <NavBar />
      <Dashboard/>
    </div>
  );
};

const FallBack = () => {
  return <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;
};

interface AppProps {
  initializeSocket: typeof initializeSocket
}

const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    props.initializeSocket(`${ROOT_URL}/chessws`);
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/chess/:id" component={ChessMatch} />
          <Route exact path="/signin" component={SignInPanel} />
          <Route exact path="/signup" component={SignUpPanel} />
          <Route exact path="/signout" component={SignOutPanel} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { signInUser, signOutUser, initializeSocket })(App);
