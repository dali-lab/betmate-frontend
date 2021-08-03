import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import { jwtSignIn } from 'store/actionCreators/authActionCreators';
import { closeSocket } from 'store/actionCreators/websocketActionCreators';

import SignUpPanel from 'containers/authentication/signUpPanel';
import SignInPanel from 'containers/authentication/signInPanel';
import SignOutPanel from 'containers/authentication/signOutPanel';
import { authTokenName } from 'utils';
import UserPage from 'containers/UserPage';
import Dashboard from '../containers/Dashboard';
import ChessMatch from '../containers/ChessMatch';
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
  closeSocket: typeof closeSocket,
  jwtSignIn: typeof jwtSignIn,
}

const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    return () => { props.closeSocket(); };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(authTokenName);
    if (token) props.jwtSignIn();
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
          <Route exact path="/user" component={UserPage} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { jwtSignIn, closeSocket })(App);
