import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signInUser } from '../../../actions';


class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <NavLink to="/admin" onClick={() => this.props.signInUser()}>Sign In</NavLink>
      </div>
    );
  }
}

export default connect(null, { signInUser })(SearchPane);
