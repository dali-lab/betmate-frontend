import React from 'react';
import { connect } from 'react-redux';

import { signInUser } from '../../../actions/authActions';


class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameUpdate(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordUpdate(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    this.props.signInUser(this.state.username, this.state.password).then((response) => {
      this.props.history.push('/admin');
    }).catch((error) => {
      // Error handling UI
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameUpdate} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordUpdate} />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

export default connect(null, { signInUser })(SearchPane);
