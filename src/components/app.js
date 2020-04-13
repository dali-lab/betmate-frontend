import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import { signInUser, signOutUser } from '../actions';

import AdminPanel from '../containers/adminPanel';
import SearchPane from '../containers/searchPane';

const Nav = (props) => {
  return (
    <nav>
      <NavLink to="/signin">Sign In</NavLink>
    </nav>
  );
};

const SignIn = (props) => {
  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <nav>
        <NavLink to="/admin" onClick={() => props.signInUser()}>Sign In</NavLink>
      </nav>
    </div>
  );
};

const Welcome = (props) => {
  return (
    <div>
      <Nav />
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
          <Route exact path="/signin" component={SignIn} />
          <Route path="/admin" component={AdminPanel} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { signInUser, signOutUser })(App);
