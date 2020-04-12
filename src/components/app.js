import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import AdminPanel from '../containers/adminPanel';

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
        <NavLink to="/admin" onClick={() => localStorage.setItem('authToken', 'Token Value')}>Sign In</NavLink>
      </nav>
    </div>
  );
};

const Welcome = (props) => {
  return (
    <div>
      <Nav />
      <p>Welcome</p>
    </div>
  );
};

// const Test = (props) => {
//   return <div> ID: {props.match.params.id} </div>;
// };

const FallBack = (props) => {
  return <div>URL Not Found</div>;
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

export default App;
