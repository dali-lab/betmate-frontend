import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <NavLink to="/admin">Sign In</NavLink>
    </nav>
  );
};

const About = (props) => {
  return <div> All there is to know about me </div>;
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
          <Route path="/admin" component={About} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
