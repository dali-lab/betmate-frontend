import React from 'react';
import { connect } from 'react-redux';

import { createLoadingSelector, createErrorMessageSelector } from '../../../actions/index';
import { signUpUser } from '../../../actions/authActions';
import { setError, clearError } from '../../../actions/errorActions';

class SignUpPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
    this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
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

  handleFirstNameUpdate(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameUpdate(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailUpdate(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordUpdate(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.firstName) {
      this.props.setError(['AUTH_USER'], 'Please enter your first name!');
    } else if (!this.state.lastName) {
      this.props.setError(['AUTH_USER'], 'Please enter your last name!');
    } else if (!this.state.email) {
      this.props.setError(['AUTH_USER'], 'Please enter an email address!');
    } else if (!this.state.password) {
      this.props.setError(['AUTH_USER'], 'Please enter a password!');
    } else {
      // Send only if all fields filled in
      this.props.signUpUser(this.state.email, this.state.password, this.state.firstName, this.state.lastName).then((response) => {
        this.props.history.push('/admin');
      }).catch((error) => {
        // Add error-handling logic here
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameUpdate} />
          <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameUpdate} />
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailUpdate} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordUpdate} />
          <input type="submit" value="Sign Up" />
        </form>
        {this.props.isLoading ? <div>Authenticating...</div> : this.props.errorMessage}
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const loadActions = ['AUTH_USER'];
const loadingSelector = createLoadingSelector(loadActions);
const errorMessageSelector = createErrorMessageSelector(loadActions);

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorMessageSelector(state),
});

export default connect(mapStateToProps, { signUpUser, setError, clearError })(SignUpPanel);
