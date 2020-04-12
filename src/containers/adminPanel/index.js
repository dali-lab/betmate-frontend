import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>
        <nav>
          <NavLink to="/" onClick={() => localStorage.removeItem('authToken')}>Sign Out</NavLink>
        </nav>
      </div>
    );
  }
}

export default AdminPanel;
