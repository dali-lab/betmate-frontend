import React from 'react';
import { connect } from 'react-redux';

import { signUpUser } from '../../../actions/authActions';


class SignUpPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
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
    this.setState({ firstName: e.target.value, errorMessage: '' });
  }

  handleLastNameUpdate(e) {
    this.setState({ lastName: e.target.value, errorMessage: '' });
  }

  handleEmailUpdate(e) {
    this.setState({ email: e.target.value, errorMessage: '' });
  }

  handlePasswordUpdate(e) {
    this.setState({ password: e.target.value, errorMessage: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.signUpUser(this.state.email, this.state.password, this.state.firstName, this.state.lastName).then((response) => {
      this.props.history.push('/admin');
    }).catch((error) => {
      // Add error-handling logic here
      this.setState({ errorMessage: error.message });
    });
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
        {this.state.errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { signUpUser })(SignUpPanel);
