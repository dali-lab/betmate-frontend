import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { signInUser as signInUserType } from 'store/actionCreators/authActionCreators';
import logo from '../../../assets/logo.png';

export interface SignInPanelProps extends RouteComponentProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessage: string[],
  signInUser: typeof signInUserType
}

const SignInPanel: React.FC<SignInPanelProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/');
    }
  }, [props.isAuthenticated]);

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      console.warn('Please enter an email address!');
    } else if (!password) {
      console.warn('Please enter a password!');
    } else {
      // Send only if all fields filled in
      props.signInUser(email, password);
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
          <input type="email" placeholder="Email" value={email} onChange={handleEmailUpdate} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordUpdate} />
          <input type="submit" value="Sign In" />
        </form>
        <div className="auth-status-message-container">
          {props.isLoading ? <div>Authenticating...</div> : <div>{props.errorMessage[0]}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignInPanel;
