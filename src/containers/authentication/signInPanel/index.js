import React from 'react';
import { connect } from 'react-redux';

import ActionTypes from '../../../actions';
import { signInUser } from '../../../actions/authActions';
import {
  createErrorSelector, setError, clearError, createLoadingSelector,
} from '../../../actions/requestActions';

class SignInPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If the user is already authenticated, auto-redirect
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/admin');
    }
  }

  handleEmailUpdate(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordUpdate(e) {
    this.setState({ password: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.email) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter an email address!');
    } else if (!this.state.password) {
      this.props.setError([ActionTypes.AUTH_USER], 'Please enter a password!');
    } else {
      // Send only if all fields filled in
      await this.props.signInUser(this.state.email, this.state.password);
      this.props.history.push('/admin');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailUpdate} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordUpdate} />
          <input type="submit" value="Sign In" />
        </form>
        {this.props.isLoading ? <div>Authenticating...</div> : this.props.errorMessage}
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const loadActions = [ActionTypes.AUTH_USER];

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  isLoading: createLoadingSelector(loadActions)(state),
  errorMessage: createErrorSelector(loadActions)(state),
});

export default connect(mapStateToProps, { signInUser, setError, clearError })(SignInPanel);
