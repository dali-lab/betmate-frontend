import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { signUpUser as signUpUserType } from 'store/actionCreators/authActionCreators';
import logo from '../../../assets/logo.png';

export interface SignInPanelProps extends RouteComponentProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessages: string[],
  signUpUser: typeof signUpUserType
}

const SignUpPanel: React.FC<SignInPanelProps> = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/');
    }
  }, [props.isAuthenticated]);

  const handleFirstNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstName) {
      console.warn('Please enter your first name!');
    } else if (!lastName) {
      console.warn('Please enter your last name!');
    } else if (!email) {
      console.warn('Please enter an email address!');
    } else if (!password) {
      console.warn('AUTH_USER', 'Please enter a password!');
    } else {
      // Send only if all fields filled in
      props.signUpUser(email, password, firstName, lastName);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="title-container">
          <h1>Betmate</h1>
          <img src={logo} alt="logo"/>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameUpdate} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameUpdate} />
          <input type="text" placeholder="Email" value={email} onChange={handleEmailUpdate} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordUpdate} />
          <input type="submit" value="Sign Up" />
        </form>
        <div className="auth-status-message-container">
          {props.isLoading ? <div>Authenticating...</div> : <div>{props.errorMessages[0]}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignUpPanel;
