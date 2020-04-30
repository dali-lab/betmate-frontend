import React from 'react';
import { connect } from 'react-redux';

import { signInUser } from '../../../actions/authActions';
import { createErrorMessageSelector } from '../../../actions';

class SignInPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // errorMessage: '',
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

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.signInUser(this.state.email, this.state.password).then((response) => {
      this.props.history.push('/admin');
    }).catch((error) => {
      // Add error-handling logic here
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailUpdate} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordUpdate} />
          <input type="submit" value="Sign In" />
        </form>
        {this.props.errorMessage}
      </div>
    );
  }
}


const errorMessageSelector = createErrorMessageSelector(['AUTH_USER']);

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  errorMessage: errorMessageSelector(state),
});

export default connect(mapStateToProps, { signInUser })(SignInPanel);
