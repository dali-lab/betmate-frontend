import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import { jwtSignIn } from 'store/actionCreators/authActionCreators';

import SignUpPanel from 'containers/authentication/signUpPanel';
import SignInPanel from 'containers/authentication/signInPanel';
import SignOutPanel from 'containers/authentication/signOutPanel';
import { authTokenName } from 'utils';
import NavBar from './NavBar';
import WagerPanel from './WagerPanel';

const Welcome = () => {
  return (
    <div>
      <NavBar />
      <WagerPanel gameId="6089d9d700b79d5122e8183f" />
    </div>
  );
};

const FallBack = () => {
  return <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;
};

const App = (props) => {
  useEffect(() => {
    const token = localStorage.getItem(authTokenName);
    if (token) props.jwtSignIn();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signin" component={SignInPanel} />
          <Route exact path="/signup" component={SignUpPanel} />
          <Route exact path="/signout" component={SignOutPanel} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { jwtSignIn })(App);
