import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import { signInUser, signOutUser } from 'store/actionCreators/authActionCreators';

import SignUpPanel from 'containers/authentication/signUpPanel';
import SignInPanel from 'containers/authentication/signInPanel';
import SignOutPanel from 'containers/authentication/signOutPanel';
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

const App = () => {
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

export default connect(null, { signInUser, signOutUser })(App);
