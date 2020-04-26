import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import { signInUser, signOutUser } from '../actions/authActions';

import AdminPanel from '../containers/adminPanel';
import SearchPane from '../containers/search/searchPane';
import SignUpPanel from '../containers/authentication/signUpPanel';
import SignInPanel from '../containers/authentication/signInPanel';
import SignOutPanel from '../containers/authentication/signOutPanel';

const Welcome = (props) => {
  return (
    <div>
      <NavLink to="/signin">Sign In</NavLink><br />
      <NavLink to="/signup">Sign Up</NavLink><br />
      <SearchPane />
    </div>
  );
};

const FallBack = (props) => {
  return <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signin" component={SignInPanel} />
          <Route exact path="/signup" component={SignUpPanel} />
          <Route exact path="/signout" component={SignOutPanel} />
          <Route path="/admin" component={AdminPanel} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { signInUser, signOutUser })(App);
