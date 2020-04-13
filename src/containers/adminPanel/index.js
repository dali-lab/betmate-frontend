import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }
}

export default AdminPanel;
