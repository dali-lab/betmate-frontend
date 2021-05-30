import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { signInUser as signInUserType } from 'store/actionCreators/authActionCreators';
import logo from '../../../assets/logo.svg';

export interface SignInPanelProps extends RouteComponentProps {
  isAuthenticated: boolean,
  isLoading: boolean,
  errorMessages: string[],
  signInUser: typeof signInUserType
}

const SignInPanel: React.FC<SignInPanelProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValidationErrors, setFormValidationErrors] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push('/');
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
    setFormValidationErrors('');

    if (!email) {
      setFormValidationErrors('Please enter an email address!');
    } else if (!password) {
      setFormValidationErrors('Please enter a password!');
    } else {
      // Send only if all fields filled in
      props.signInUser(email, password);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-padding-container">
          <div className="title-container">
            <h1>Betmate</h1>
            <img src={logo} alt="logo"/>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <p>Email</p>
            <input type="email" value={email} onChange={handleEmailUpdate} />
            <p>Password</p>
            <input type="password" value={password} onChange={handlePasswordUpdate} />
            <input type="submit" value="Sign In" />
          </form>
          <div className="auth-status-message-container">
            {props.isLoading ? <div>Authenticating...</div> : <div>{props.errorMessages[0]}</div>}
            {formValidationErrors && <div>{formValidationErrors}</div>}
          </div>
          <div className="auth-redirect-links">
            <p
              className="auth-redirect-link"
              onClick={() => history.push('/')}
            >
              dashboard
            </p>
            <p className="auth-redirect-link"> | </p>
            <p
              className="auth-redirect-link"
              onClick={() => history.push('/signup')}
            >
              create account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPanel;
